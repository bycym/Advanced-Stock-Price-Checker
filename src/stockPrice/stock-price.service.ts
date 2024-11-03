import { logger } from "@lib/logger/logger";
import { IStockPriceEntity, StockPriceEntity } from "./stock-price.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FinnHubAPIService } from "src/API/Finnhub/finnhub-api.service";
import { Repository } from "typeorm";

export interface IStockPriceService {
  findAll(): Promise<IStockPriceEntity[]>;
  findBySymbol(symbol: string): Promise<IStockPriceEntity>;
  create(symbol: string): Promise<IStockPriceEntity | null>;
  update(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity | null>;
}

@Injectable()
export class StockPriceService implements IStockPriceService {
  constructor(
    @InjectRepository(StockPriceEntity)
    private readonly stockPriceRepository: Repository<StockPriceEntity>,
    private readonly finnHubAPIService: FinnHubAPIService
  ) {}

  async findAll(): Promise<IStockPriceEntity[]> {
    return await this.stockPriceRepository.find();
  }

  async findBySymbol(symbol: string): Promise<IStockPriceEntity | null> {
    const stockPriceEntity = await this.stockPriceRepository.findOneBy({
      symbol: symbol,
    });
    if (stockPriceEntity) return stockPriceEntity;
    return null;
  }
  async create(symbol: string): Promise<StockPriceEntity> {
    const stockPriceEntity = await this.stockPriceRepository.findOneBy({
      symbol: symbol,
    });
    if (stockPriceEntity) return stockPriceEntity;

    const isValidSymbol = await this.finnHubAPIService.isValid(symbol);
    if (!isValidSymbol) {
      logger.error(`${symbol} invalid symbol.`);
      return null;
    }

    const newStockPriceEntity = {
      symbol: symbol,
      updated: new Date(),
    } as StockPriceEntity;
    return await this.stockPriceRepository.save(newStockPriceEntity);
  }

  async update(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity> {
    const storedStockPriceEntity = await this.stockPriceRepository.findOneBy({
      symbol: stockPrice.symbol,
    });

    if (!storedStockPriceEntity) throw new Error("Missing symbol");

    storedStockPriceEntity.movingAverage = stockPrice.movingAverage;
    storedStockPriceEntity.price = stockPrice.price;
    storedStockPriceEntity.updated = stockPrice.updated;

    return await this.stockPriceRepository.save(storedStockPriceEntity);
  }
}
