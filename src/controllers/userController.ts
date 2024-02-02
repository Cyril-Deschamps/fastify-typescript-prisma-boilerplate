import loggerFactory from "../services/loggerService";
import { PrismaClient } from "@prisma/client";
import { InferedController } from "../schemas/utils";
import {
  createUserSchema,
  getUserByIdSchema,
  hasAccessToUserCheckerSchema,
  updateUserByIdSchema,
} from "../schemas/user";
import { AppError } from "../services/errorService";
import { FIELDS_PUBLIC_USER } from "../types/user";
import { hashPassword } from "../services/pwdService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const logger = loggerFactory(import.meta.url);
const prisma = new PrismaClient();

// Create a user with password
export const createUser: InferedController<typeof createUserSchema> = async (
  req,
  res,
) => {
  // We hash the password to be the stored in the database
  const hashedPwd = await hashPassword(req.body.password);
  req.body.password = hashedPwd;

  // Create user
  try {
    await prisma.user.create({
      data: req.body,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new AppError(409, "User already exists");
      }
    }
    logger.error("Error in createUser prisma : %O", err);
    throw new Error();
  }

  return res.send("User created");
};

// Get user by id
export const getUserById: InferedController<typeof getUserByIdSchema> = async (
  req,
  res,
) => {
  let user = null;

  // Get user from database
  try {
    user = await prisma.user.findUnique({
      where: { id: req.params.user_id },
      select: FIELDS_PUBLIC_USER,
    });
  } catch (err) {
    logger.error("Error in getUserById prisma : %O", err);
    throw new Error();
  }

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return res.send(user);
};

// Update user by id
// Note : only update firstName and lastName
export const updateUserById: InferedController<
  typeof updateUserByIdSchema
> = async (req, res) => {
  // Update user in database
  try {
    await prisma.user.update({
      where: { id: req.params.user_id },
      data: req.body,
    });
  } catch (err) {
    logger.error("Error in updateUserById prisma : %O", err);
    throw new Error();
  }

  return res.send("User updated");
};

// ----------------------------------------------------
// ------------------- Middleware ---------------------
// ----------------------------------------------------

// Check if the current ressource can be accessed by the user requesting it
export const hasAccessToUserChecker: InferedController<
  typeof hasAccessToUserCheckerSchema
> = async (req, _res) => {
  // If the user is not authenticated or the user id is not the same as the one in the params
  if (!req.decoded || req.decoded.id !== req.params.user_id) {
    throw new AppError(403, "Resource is not owned by this user");
  }
};
