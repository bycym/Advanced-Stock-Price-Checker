import { get } from "@lib/fetch-cache-data";
import { finnhubDataType } from "./type";

const API_KEY = process.env.FINNHUB_API;
const createURL = (stockSymbol: string) =>
  `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=` + API_KEY;

import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StockPriceService } from "@stockPrice/stock-price.service";
import {
  IStockPriceEntity,
  StockPriceEntity,
} from "@stockPrice/stock-price.entity";
import { logger } from "@lib/logger/logger";

@Injectable()
export class FinnhubTaskService {
  constructor(private readonly stockPriceService: StockPriceService) {}
  private readonly log = new Logger(FinnhubTaskService.name);

  // @Cron(CronExpression.EVERY_4_HOURS)
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    this.log.debug(`${FinnhubTaskService.name} started.`);

    const stockSymbols = await this.stockPriceService.findAll();
    if (!stockSymbols) return;

    await Promise.all(
      stockSymbols.map(async (stockPrice: IStockPriceEntity) => {
        const data: finnhubDataType = await get(createURL(stockPrice.symbol));
        // await RedisCaching.setValue(`${stockSymbol}`, JSON.stringify(data));
        this.log.debug(JSON.stringify(data));

        const newStockPrice = {
          price: data.c,
          updated: new Date(),
          movingAverage: 0,
        } as StockPriceEntity;

        this.stockPriceService.update(newStockPrice);
      })
    );

    logger.info(`${FinnhubTaskService.name} ended.`);
  }
}
