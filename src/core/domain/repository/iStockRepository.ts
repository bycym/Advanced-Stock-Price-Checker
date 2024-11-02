import { IStockPriceEntity } from "@infrastructure/persistence/entity/stockPrice.entity";

export interface IStockPriceRepository {
  findBySymbol(symbol: string): Promise<IStockPriceEntity | null>;
  update(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity>;
  add(stockPrice: IStockPriceEntity): Promise<IStockPriceEntity>;
}
