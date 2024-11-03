import { createClient, RedisClientType } from "redis";
import { logger } from "./logger/logger";

export class RedisCaching {
  private static instance: RedisClientType | null = null;

  private constructor() {}

  public static async getInstance(): Promise<RedisClientType> {
    if (!RedisCaching.instance) {
      RedisCaching.instance = createClient({
        url: process.env.REDIS_URL ?? "redis://localhost:6379"
      });

      RedisCaching.instance.connect().catch(logger.error);
      RedisCaching.instance.on("error", (err) =>
        logger.log("Redis Client Error", err)
      );
      await RedisCaching.instance.connect();
    }

    return RedisCaching.instance;
  }

  public static setValue = async (
    key: string,
    value: string,
    option: unknown = { EX: 3600 } // 1-hour expiration
  ): Promise<void> => {
    await RedisCaching.instance.set(key, value, option);
  };

  public static getValue = async (key: string): Promise<string | null> => {
    return RedisCaching.instance.get(key);
  };

  public static checkRedisHealth = async (): Promise<boolean> => {
    try {
      await RedisCaching.instance.set("health", "ok");
      const reply = await RedisCaching.instance.get("health");
      return reply === "ok";
    } catch (error) {
      console.error("Redis Health Check Failed:", error);
      return false;
    }
  };
}
