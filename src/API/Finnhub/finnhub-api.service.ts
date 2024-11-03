import { Injectable } from "@nestjs/common";
import { FinnhubDataType } from "./type";
import { get } from "@lib/fetch-cache-data";

export interface IFinnHubAPIServiceService {
  isValid(symbol: string): Promise<boolean>;
  getData(symbol: string): Promise<FinnhubDataType>;
}

@Injectable()
export class FinnHubAPIService implements IFinnHubAPIServiceService {
  private readonly API_KEY = process.env.FINNHUB_API;
  readonly API_URL = "https://finnhub.io/api/v1/quote";

  private createURL = (stockSymbol: string) =>
    `${this.API_URL}?symbol=${stockSymbol}&token=${this.API_KEY}`;

  public async isValid(symbol: string): Promise<boolean> {
    const data: FinnhubDataType = await get(this.createURL(symbol));
    if (data.c === 0 && data.d === null) return false;
    return !!data;
  }
  public async getData(symbol: string): Promise<FinnhubDataType> {
    const data: FinnhubDataType = await get(this.createURL(symbol));
    return data;
  }
}
