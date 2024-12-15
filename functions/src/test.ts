import { logger } from "firebase-functions/v1";

export function testEnv(description: string) {
  logger.debug(`DEBUG: -${description}- ${process.env.FUNCTION_TARGET}`);
}
