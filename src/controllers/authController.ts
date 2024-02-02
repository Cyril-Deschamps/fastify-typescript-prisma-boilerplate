import { deploymentEnv, secret } from "../config/config";
import uid from "uid-safe";
import jwt from "jsonwebtoken";
import loggerFactory from "../services/loggerService";
import { PrismaClient } from "@prisma/client";
import { UserSended } from "../types/user";
import { AppError } from "../services/errorService";
import { isAuthenticatedCheckerSchema, loginSchema } from "../schemas/auth";
import { FastifyController, InferedController } from "../schemas/utils";
import { verifyPassword } from "../services/pwdService";
const logger = loggerFactory(import.meta.url);
const prisma = new PrismaClient();

// Login user, set cookie and return user with csrf token
export const login: InferedController<typeof loginSchema> = async (
  req,
  res,
) => {
  let user;

  // Get user from database
  try {
    user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
  } catch (err) {
    logger.error("Error in login prisma : %O", err);
    throw new Error();
  }

  if (!user) {
    logger.debug("Authentication failed. User not found");
    throw new AppError(404, "Authentication failed. User not found.");
  }

  // Verify password
  const areEqual = await verifyPassword(req.body.password, user.password);
  if (!areEqual) {
    logger.debug("Authentication failed. Wrong password");
    throw new AppError(404, "Authentication failed. Wrong password.");
  }

  // Format userSended
  const { password: _password, ...userWithoutPassword } = user;
  const securedUser: UserSended = {
    ...userWithoutPassword,
    xsrfToken: uid.sync(18),
  };

  // Create JWT token with xsrfToken inside
  const hour = 3600;
  const validity = 7 * 24 * hour;
  const token = jwt.sign(securedUser, secret, {
    expiresIn: validity,
  });

  // Set cookie with token
  res.setCookie("access_token", token, {
    httpOnly: true,
    secure: deploymentEnv === "production", // true to force https
    maxAge: validity * 1000,
    path: "/",
  });

  // Send user with xsrfToken
  return res.send({
    success: true,
    message: "Enjoy your token!",
    securedUser,
  });
};

// Logout user, delete cookie
export const logout: FastifyController = (_req, res) => {
  res.clearCookie("access_token");
  return res.send("Cookie successfully deleted!");
};

// Check if cookie is provided
export const hasCookies: FastifyController = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    logger.error("Cookie not provided");
    throw new AppError(401, "No token provided");
  }

  logger.debug("Cookie provided");
  return res.send("Cookie provided");
};

export const isAuthenticated: InferedController<
  typeof isAuthenticatedCheckerSchema
> = async (req, res) => {
  await loadAuthenticatedRequester(req, res);
  return res.send("Authenticated");
};

// ----------------------------------------------------
// ------------------- Middleware ---------------------
// ----------------------------------------------------

// Check if the user is authenticated
// Post-cond :
// - req.decoded is set with the user decoded of the cookie
// - req.user is set with the user (who make the request) from the database
export const loadAuthenticatedRequester: InferedController<
  typeof isAuthenticatedCheckerSchema
> = async (req, _res) => {
  const xsrfToken = req.headers.authorization.substring(7); // Remove Bearer
  const token = req.cookies.access_token;

  if (!token) {
    throw new AppError(401, "No token provided");
  }

  // Decode token
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    logger.debug("Failed to authenticate token : %O", err);
    throw new AppError(401, "Failed to authenticate token.");
  }

  // Check if the token is valid
  if (!decoded || typeof decoded === "string") {
    throw new AppError(401, "Failed to authenticate token.");
  }

  // Looks good check for XSRF attacks, xsrf token must match cookie
  if (decoded && (decoded as UserSended).xsrfToken !== xsrfToken) {
    throw new AppError(401, "Hacking XSRF Attempt");
  }

  // If everything is good, save to request for use in other routes
  req.decoded = decoded as UserSended;

  // Load user from database
  try {
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
  } catch (err) {
    logger.error("Error in isAuthenticated prisma : %O", err);
    throw new Error();
  }

  // If user not found on database
  if (req.user === null) {
    throw new AppError(401, "User not found");
  }
};
