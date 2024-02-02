import loggerFactory from "./loggerService";
const logger = loggerFactory(import.meta.url);
import { genSalt, hash, compare } from "bcrypt";

export const hashPassword = async function (clearPwd: string): Promise<string> {
  logger.debug("pwdService - Hash password");
  let hashedPwd: string;
  try {
    hashedPwd = await genSalt().then((salt) => hash(clearPwd, salt));
  } catch (err) {
    logger.error("Error in hashPassword : %O", err);
    throw new Error();
  }
  return hashedPwd;
};

export const verifyPassword = async function (
  clearPwd: string,
  compareHashedPwd: string,
): Promise<boolean> {
  try {
    const areEqual = await compare(clearPwd, compareHashedPwd);
    return areEqual;
  } catch (err) {
    logger.error("Error in verifyPassword : %O", err);
  }
  return false;
};
