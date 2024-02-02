import { FastifyReply, FastifyRequest } from "fastify";
import { logDirectory, logLevel } from "../config/config";
import path from "path";
import winstonModule from "winston";
const { createLogger, format, transports } = winstonModule;
const { colorize, combine, label, printf, splat, timestamp } = format;

const getLabel = function (callingModule: string) {
  const parts = callingModule.split(path.sep);
  return parts[parts.length - 2] + "/" + parts.pop();
};

const loggerFactory = (callingModule: string) => {
  const logger = createLogger({
    format: combine(
      //label({ label: path.basename(process.mainModule.filename) }),
      label({ label: getLabel(callingModule) }),
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      splat(),
      printf(
        (info) =>
          `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
      ),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "server.log", dirname: logDirectory }),
    ],
    level: logLevel,
    exceptionHandlers: [
      new transports.File({ filename: "exception.log", dirname: logDirectory }),
      new transports.Console(),
    ],
    exitOnError: false,
  });
  logger.info("Logs set up done, captured 2 ways- console & file");
  return logger;
};

export function logOnRequest(
  request: FastifyRequest,
  reply: FastifyReply,
  logger: winstonModule.Logger,
) {
  const { method, url } = request.raw;
  const ip = request.ip;
  const startTime = process.hrtime();

  reply.raw.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    const userAgent = request.headers["user-agent"] || "-";
    const date = new Date().toISOString();
    const status = reply.statusCode;
    const resLength = reply.getHeader("content-length") || "-";
    logger.info(
      `::${ip} - [${date}] "${method} ${url} HTTP/1.1" ${status} ${resLength} "-" "${userAgent}" ${duration}ms`,
    );
  });

  return Promise.resolve();
}

export default loggerFactory;
