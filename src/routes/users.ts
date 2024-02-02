import { FastifyInstance, RegisterOptions } from "fastify";
import {
  createUser,
  getUserById,
  hasAccessToUserChecker,
  updateUserById,
} from "../controllers/userController";
import { isAuthenticatedCheckerSchema } from "../schemas/auth";
import { FastifyReplyInfered, FastifyRequestInfered } from "../schemas/utils";
import {
  createUserSchema,
  hasAccessToUserCheckerSchema,
} from "../schemas/user";
import { loadAuthenticatedRequester } from "../controllers/authController";

// Register user routes with fastify
// Note: call in in fastify register callback
const userRoutes = (
  fastify: FastifyInstance,
  _options: RegisterOptions,
  done: (err?: Error) => void,
) => {
  fastify.post("/createUser", { schema: createUserSchema }, createUser);

  fastify.register(userSecuredRoutes);
  return done();
};

// Register secured user routes with fastify
// Args:
// - fastify : instance of fastify pass with register
const userSecuredRoutes = (
  fastify: FastifyInstance,
  _options: RegisterOptions,
  done: (err?: Error) => void,
) => {
  // Authenticate user and check his access
  fastify.addHook("preHandler", async (req, res) => {
    await loadAuthenticatedRequester(
      req as FastifyRequestInfered<typeof isAuthenticatedCheckerSchema>,
      res as FastifyReplyInfered<typeof isAuthenticatedCheckerSchema>,
    );
    await hasAccessToUserChecker(
      req as FastifyRequestInfered<typeof hasAccessToUserCheckerSchema>,
      res as FastifyReplyInfered<typeof hasAccessToUserCheckerSchema>,
    );
  });

  fastify.get(
    "/:user_id",
    { schema: hasAccessToUserCheckerSchema },
    getUserById,
  );
  fastify.put("/:user_id", updateUserById);

  return done();
};

export default userRoutes;
