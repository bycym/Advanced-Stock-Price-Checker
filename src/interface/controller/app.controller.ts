import { Controller, Get, Header, HttpCode, Param, Put } from "@nestjs/common";
import { AppService } from "../../app.service";
import { logger } from "../../lib/logger/logger";

@Controller("stock")
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Retrieves and displays the current stock price, the last
   * updated time, and the moving average for the given symbol.
   * @param symbol stock symbol
   * @returns
   */
  @Get(":symbol")
  @HttpCode(200)
  @Header("Cache-Control", "none")
  getStockPrice(@Param("symbol") symbol: string): string {
    logger.info(
      `This endpoint give back give back the current stock prive for ${symbol}`
    );
    return this.appService.getHello();
  }

  /**
   * Starts the periodic checks for a given symbol
   * @param symbol stock symbol
   * @returns
   */
  @Put(":symbol")
  @HttpCode(201)
  stockPrice(@Param("symbol") symbol: string): string {
    logger.info(
      `This endpoint a put give back give back the current stock prive for ${symbol}`
    );
    return this.appService.getHello();
  }
}
