import { FastifyInstance, RegisterOptions } from "fastify";
import {
  logout,
  hasCookies,
  isAuthenticated,
  login,
} from "../controllers/authController";
import { isAuthenticatedCheckerSchema, loginSchema } from "../schemas/auth";

// Auth router
const authRoutes = (
  fastify: FastifyInstance,
  _options: RegisterOptions,
  done: (err?: Error) => void,
) => {
  fastify.get("/logout", logout);
  fastify.post("/login", { schema: loginSchema }, login);
  fastify.post("/security", hasCookies);
  fastify.get(
    "/authenticated",
    { schema: isAuthenticatedCheckerSchema },
    isAuthenticated,
  );

  return done();
};

export default authRoutes;
