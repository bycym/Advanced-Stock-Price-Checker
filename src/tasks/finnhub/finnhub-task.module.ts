import { Module } from "@nestjs/common";
import { FinnhubTaskService } from "./finnhub-task.service";
import { StockPriceModule } from "@stockPrice/stock-price.module";

@Module({
  providers: [FinnhubTaskService],
  imports: [StockPriceModule],
})
export class FinnHubTaskModule {}
