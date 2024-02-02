import "fastify";
import { UserSended } from "./user";
import { User } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    decoded?: UserSended | null; // User decoded from the cookie
    user?: User | null; // User (from prisma) making the request
  }
}
