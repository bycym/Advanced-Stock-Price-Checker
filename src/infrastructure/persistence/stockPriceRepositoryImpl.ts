import AppDataSource from "@infrastructure/database/dataSource";
import {
  IStockPriceEntity,
  StockPriceEntity,
} from "./entity/stockPrice.entity";
import { IStockPriceRepository } from "@domain/repository/iStockRepository";

export class StockPriceRepositoryImpl implements IStockPriceRepository {
  async findBySymbol(symbol: string): Promise<IStockPriceEntity | null> {
    const stockPriceRepository = AppDataSource.getRepository(StockPriceEntity);
    const stockPriceEntity = await stockPriceRepository.findOneBy({
      symbol: symbol,
    });
    if (stockPriceEntity) return stockPriceEntity;
    return null;
  }
  async add(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity> {
    // TODO: api check
    const stockPriceRepository = AppDataSource.getRepository(StockPriceEntity);
    const stockPriceEntity = await stockPriceRepository.findOneBy({
      symbol: stockPrice.symbol,
    });
    if (stockPriceEntity) return stockPriceEntity;
    const newStockPriceEntity = {
      symbol: stockPrice.symbol,
    } as StockPriceEntity;
    return await stockPriceRepository.save(newStockPriceEntity);
  }

  async update(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity> {
    const stockPriceRepository = AppDataSource.getRepository(StockPriceEntity);
    const storedStockPriceEntity = await stockPriceRepository.findOneBy({
      symbol: stockPrice.symbol,
    });

    if (!storedStockPriceEntity) throw new Error("Missing symbol");

    storedStockPriceEntity.movingAverage = stockPrice.movingAverage;
    storedStockPriceEntity.stockPrice = stockPrice.stockPrice;
    storedStockPriceEntity.updated = stockPrice.updated;

    return await stockPriceRepository.save(storedStockPriceEntity);
  }
}
