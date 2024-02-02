import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import winstonModule from "winston";

export class AppError extends Error {
  statusCode;
  message;

  constructor(statusCode: number, data?: string) {
    super(data);
    this.statusCode = statusCode;
    this.message = JSON.stringify(data, null, 2);
  }
}

export const errorHandler = (
  error: FastifyError | AppError,
  req: FastifyRequest,
  res: FastifyReply,
  logger: winstonModule.Logger,
) => {
  logger.info("error handling");
  logger.error("%O", error);
  logger.error("%O", error.stack);

  // AppError is our custom error class
  if (error instanceof AppError) {
    return res.status(error.statusCode).send(error.message);
  }

  // Missing something in the request compared to the schema
  if (error.code === "FST_ERR_VALIDATION" && error.validation !== undefined) {
    return res
      .status(422)
      .send(error.validation.map((error) => error.message).join("\n"));
  }

  return res.status(500).send("Internal Server Error");
};
