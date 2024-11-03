import { Module } from "@nestjs/common";
import { FinnhubTaskService } from "./finnhub-task.service";
import { StockPriceModule } from "@stockPrice/stock-price.module";
import { FinnHubApiModule } from "src/API/Finnhub/finnhub-api.module";

@Module({
  imports: [StockPriceModule, FinnHubApiModule],
  providers: [FinnhubTaskService],
})
export class FinnHubTaskModule {}
