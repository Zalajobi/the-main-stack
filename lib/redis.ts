import { createClient, RedisClientType } from "redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../util/config";

class RedisClient {
  private client: RedisClientType;
  private static instance: RedisClient;

  private constructor() {
    this.init();
  }

  private async init() {
    console.log("CONNECTING...");
    this.client = (await createClient({
      password: REDIS_PASSWORD,
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      },
    })
      .on("connect", () => {
        console.log("Redis Connected...");
      })
      .on("ready", () => {
        console.log("Redis ready to accept commands");
      })
      .on("error", (err: any) => {
        console.error("Redis Error: ", err);
      })
      .connect()) as RedisClientType;
  }

  static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }

    return RedisClient.instance;
  }

  getClient() {
    return this.client;
  }

  async setRedisKey(key: string, value: string, expiry: number) {
    await this.client.set(key, value, {
      EX: expiry,
    });
  }

  async getRedisKey(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async deleteRedisKey(key: string) {
    await this.client.del(key);
  }
}

const redisClient = RedisClient.getInstance();
export default redisClient;
