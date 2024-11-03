import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./lib/logger/logger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix("api");

  const options = new DocumentBuilder()
    .setTitle("NestJS Advanced Stock Price Checker")
    .setDescription(
      "This API is get the latest stock data from the set up (finnhub) API"
    )
    .setVersion("1.0")
    .setBasePath("api")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);

  logger.info(`Backend service Listening on Port ${process.env.PORT ?? 3000}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
