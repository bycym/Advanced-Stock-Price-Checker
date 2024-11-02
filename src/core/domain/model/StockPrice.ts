export interface IStockPrice {
  symbol: string;
  stockPrice: number;
  updated: Date;
  movingAverage: number;
}

export class StockPrice implements IStockPrice {
  symbol: string;
  stockPrice: number;
  updated: Date;
  movingAverage: number;

  constructor(
    symbol: string,
    stockPrice: number,
    updated: Date,
    movingAverage: number
  ) {
    this.symbol = symbol;
    this.stockPrice = stockPrice;
    this.updated = updated;
    this.movingAverage = movingAverage;
  }
}
