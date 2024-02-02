import { config as dotenvConfig } from "dotenv";
import { join } from "path";
dotenvConfig();

export const project_name = "REPLACE-PROJECT-NAME";

//secret used to encrypt pwd
export const secret = process.env.APP_SECRET!;

//mysql db config
export const db = {
  host: process.env.APP_DB_HOST!,
  database: process.env.APP_DB_NAME!,
  user: process.env.APP_DB_USER!,
  password: process.env.APP_DB_PASSWORD!,
};

export const back = process.env.APP_BACKEND_PUBLIC_URL!;
export const apiPath = "/api";
export const front = process.env.APP_FRONTEND_PUBLIC_URL!;
export const port = process.env.INTERNAL_PORT
  ? parseInt(process.env.INTERNAL_PORT)
  : 80;

export const storagePath = process.env.STORAGE_PATH || "storage";

//log
export const logDirectory = join(storagePath, "logs");
export const logLevel = "debug";

// cors
export const cors_origin = process.env.APP_CORS_ORIGIN
  ? process.env.APP_CORS_ORIGIN.split(",").concat([
      process.env.APP_FRONTEND_PUBLIC_URL!,
    ])
  : [process.env.APP_FRONTEND_PUBLIC_URL!];

// env
export const deploymentEnv = process.env.NODE_ENV || "development";
