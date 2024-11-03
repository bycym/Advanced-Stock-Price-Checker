import axios from "axios";
import { logger } from "./logger/logger";
import { FinnhubDataType } from "src/API/Finnhub/type";

export async function get(url: string): Promise<FinnhubDataType> {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    logger.error(`Api called: ${url}`);
    logger.error(`Error fetching API data: ${error}`);
    throw new Error(`Error fetching API data: ${error}`);
  }
}
