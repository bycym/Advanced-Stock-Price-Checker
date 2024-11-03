import axios from "axios";
import { logger } from "./logger/logger";
import { finnhubDataType } from "src/tasks/finnhub/type";

export async function get(url: string): Promise<finnhubDataType> {
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
