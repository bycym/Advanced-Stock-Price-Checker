import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockPriceController } from "./stock-price.controller";
import { StockPriceEntity } from "./stock-price.entity";
import { StockPriceService } from "./stock-price.service";

@Module({
  imports: [TypeOrmModule.forFeature([StockPriceEntity])],
  providers: [StockPriceService],
  exports: [StockPriceService],
  controllers: [StockPriceController],
})
export class StockPriceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
