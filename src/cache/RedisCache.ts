import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../config/cache';

interface ISaveParams {
  key: string;
  value: any;
}

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  async save({ key, value }: ISaveParams): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
