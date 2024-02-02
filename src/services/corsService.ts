import { FastifyCorsOptions } from "@fastify/cors";
import { cors_origin, deploymentEnv } from "../config/config";

export const corsConfig: FastifyCorsOptions = {
  origin: (origin, cb) => {
    if (origin) {
      if (deploymentEnv === "production") {
        if (cors_origin.indexOf(origin) != -1) {
          return cb(null, origin);
        } else {
          return cb(new Error("Not allowed"), origin);
        }
      }
    }
    return cb(null, "*");
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "authorization",
    "origin",
    "X-Requested-With",
    "content-type",
    "accept",
    "X-XSRF-TOKEN",
  ],
};
