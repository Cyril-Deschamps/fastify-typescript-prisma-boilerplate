import { project_name } from "../config/config";
import authRoutes from "./auth";
import userRoutes from "./users";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

const registerRoutes = (
  fastify: FastifyInstance,
  _options: RegisterOptions,
  done: (err?: Error) => void,
) => {
  // Register routes of folder
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(authRoutes, { prefix: "/auth" });

  // Base route
  fastify.get("/", (_req: FastifyRequest, res: FastifyReply) =>
    res.send(`Welcome to ${project_name} REST api!`),
  );

  return done();
};

export default registerRoutes;
