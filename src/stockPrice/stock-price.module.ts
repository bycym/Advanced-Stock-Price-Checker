import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockPriceController } from "./stock-price.controller";
import { StockPriceEntity } from "./stock-price.entity";
import { StockPriceService } from "./stock-price.service";
import { FinnHubApiModule } from "src/API/Finnhub/finnhub-api.module";

@Module({
  imports: [TypeOrmModule.forFeature([StockPriceEntity]), FinnHubApiModule],
  providers: [StockPriceService],
  exports: [StockPriceService],
  controllers: [StockPriceController]
})
export class StockPriceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
