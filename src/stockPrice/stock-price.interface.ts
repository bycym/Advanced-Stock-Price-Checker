export interface IStockPrice {
  symbol: string;
  price: number;
  updated: Date;
  movingAverage: number;
}

export class StockPrice implements IStockPrice {
  symbol: string;
  price: number;
  updated: Date;
  movingAverage: number;

  constructor(
    symbol: string,
    price: number,
    updated: Date,
    movingAverage: number
  ) {
    this.symbol = symbol;
    this.price = price;
    this.updated = updated;
    this.movingAverage = movingAverage;
  }
}

export interface StockPriceRO {
  stockPrice: {
    currentPrice: number;
    updated: string;
    movingAverage: number;
  };
}
