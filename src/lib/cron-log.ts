import { logger } from "./logger/logger";

export async function cronLog(id: string, fileName: string, message: string) {
  logger.info(`\n\n${new Date()} :: (${id} - ${fileName} ${message})`);
}
