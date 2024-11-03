import { FinnhubDataType } from "../../API/Finnhub/type";
import { config } from "dotenv";
config();

import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StockPriceService } from "@stockPrice/stock-price.service";
import { StockPriceEntity } from "@stockPrice/stock-price.entity";
import { FinnHubAPIService } from "src/API/Finnhub/finnhub-api.service";

@Injectable()
export class FinnhubTaskService {
  constructor(
    private readonly stockPriceService: StockPriceService,
    private readonly finnHubAPIService: FinnHubAPIService
  ) {}
  private readonly log = new Logger(FinnhubTaskService.name);

  @Cron(CronExpression.EVERY_4_HOURS)
  async handleCron() {
    this.log.debug(`${FinnhubTaskService.name} started. ⏳`);

    const stockSymbols = await this.stockPriceService.findAll();
    if (!stockSymbols) return;

    await Promise.all(
      stockSymbols.map(async (stockPrice: StockPriceEntity) => {
        const data: FinnhubDataType = await this.finnHubAPIService.getData(
          stockPrice.symbol
        );
        // await RedisCaching.setValue(`${stockSymbol}`, JSON.stringify(data));
        const newMovingAverage =
          stockPrice.movingAverage === 0 || stockPrice.price == null
            ? data.c
            : (data.c + stockPrice.price) / 2;

        const newStockPrice = {
          price: data.c,
          updated: new Date(),
          movingAverage: newMovingAverage,
        } as StockPriceEntity;

        this.stockPriceService.update(newStockPrice);
      })
    );

    this.log.debug(`${FinnhubTaskService.name} ended. ✅`);
  }
}
