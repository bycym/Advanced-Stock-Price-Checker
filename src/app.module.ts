import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockPriceEntity } from "@stockPrice/stock-price.entity";
import { StockPriceModule } from "./stockPrice/stock-price.module";
import { ScheduleModule } from "@nestjs/schedule";
import { FinnHubTaskModule } from "./tasks/finnhub/finnhub-task.module";
import { FinnHubApiModule } from "./API/Finnhub/finnhub-api.module";
// import configuration from "./config/configuration";

@Module({
  imports: [
    FinnHubTaskModule,
    StockPriceModule,
    FinnHubApiModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: ".env" }),
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_USER) ?? 5432,
      username: process.env.DATABASE_USER ?? "user",
      password: process.env.DATABASE_PASSWORD ?? "password",
      database: process.env.DATABASE_DATABASE ?? "main",
      entities: [StockPriceEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
