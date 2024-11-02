import { IStockPrice } from "../model/StockPrice";

export interface IStockPriceSerice {
  addPeriodicSymbolCheck(symbol: symbol): Promise<IStockPrice>;
  getSymbolData(symbol: symbol): Promise<IStockPrice | null>;
}
