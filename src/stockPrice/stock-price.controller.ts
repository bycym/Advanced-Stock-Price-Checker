import {
  Get,
  Param,
  Controller,
  Header,
  HttpCode,
  Put,
  HttpException
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { logger } from "@lib/logger/logger";
import { StockPriceService } from "./stock-price.service";
import { StockPriceRO } from "./stock-price.interface";

@ApiBearerAuth()
@ApiTags("stock")
@Controller("stock")
export class StockPriceController {
  constructor(private readonly stockPriceService: StockPriceService) {}

  /**
   * Retrieves and displays the current stock price, the last
   * updated time, and the moving average for the given symbol.
   * @param symbol stock symbol
   * @returns
   */
  @Get(":symbol")
  @HttpCode(200)
  @Header("Cache-Control", "none")
  async getStockPrice(@Param("symbol") symbol: string): Promise<StockPriceRO> {
    logger.info(
      `This endpoint give back give back the current stock prive for ${symbol}`
    );

    const _stockPrice = await this.stockPriceService.findBySymbol(symbol);
    const errors = { stockPrice: " not found" };
    if (!_stockPrice) throw new HttpException({ errors }, 404);
    const { movingAverage, price, updated } = _stockPrice;
    const stockPrice = {
      currentPrice: price,
      updated: updated.toDateString(),
      movingAverage
    };
    return { stockPrice };
  }

  /**
   * Starts the periodic checks for a given symbol
   * @param symbol stock symbol
   * @returns
   */
  @Put(":symbol")
  @HttpCode(201)
  async createStockPrice(
    @Param("symbol") symbol: string
  ): Promise<StockPriceRO> {
    logger.info(
      `This endpoint a put give back give back the current stock prive for ${symbol}`
    );
    const _stockPrice = await this.stockPriceService.create(symbol);
    const errors = { stockPrice: " not found" };
    if (!_stockPrice) throw new HttpException({ errors }, 404);
    const { movingAverage, price, updated } = _stockPrice;
    const stockPrice = {
      currentPrice: price,
      updated: updated.toDateString(),
      movingAverage
    };
    return { stockPrice };
  }
}
