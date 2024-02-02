import Fastify from "fastify";
import cors from "@fastify/cors";
import { apiPath, port, logDirectory, back, secret } from "./config/config";
import loggerFactory, { logOnRequest } from "./services/loggerService";
import { errorHandler } from "./services/errorService";
import registerRoutes from "./routes/index";
import fastifyMultipart from "@fastify/multipart";
import fastifyFormbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { corsConfig } from "./services/corsService";

const logger = loggerFactory(import.meta.url);
Error.stackTraceLimit = Infinity;

const fastifyApp = Fastify({
  logger: false,
  bodyLimit: 5 * 1024 * 1024,
  ajv: {
    customOptions: {
      removeAdditional: "all",
    },
  },
});

// Add pretty log on request
fastifyApp.addHook("onRequest", (req, res) => logOnRequest(req, res, logger));

// Main error handler
fastifyApp.setErrorHandler((err, req, res) =>
  errorHandler(err, req, res, logger),
);

// Accept multipart and urlencoded
fastifyApp.register(fastifyMultipart);
fastifyApp.register(fastifyFormbody);

// Enable CORS
fastifyApp.register(cors, corsConfig);

// Accept cookies
fastifyApp.register(fastifyCookie, { secret });

// Add typebox type provider
fastifyApp.withTypeProvider<TypeBoxTypeProvider>();

// Plug our router from routes.js to /api URI
fastifyApp.register(registerRoutes, { prefix: apiPath });

// Start the server
fastifyApp.listen({ port: port, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastifyApp.log.error(err);
    process.exit(1);
  }

  logger.debug("Magic happens on port " + port);
  logger.debug("logDirectory " + logDirectory);
  logger.debug(`API is available at "${new URL(apiPath, back)}".`);
});
