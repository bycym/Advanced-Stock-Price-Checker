import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./lib/logger/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  logger.info(`Backend service Listening on Port ${process.env.PORT ?? 3000}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
