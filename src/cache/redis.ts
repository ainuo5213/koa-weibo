/**
 * @description 操作redis
 * @author ainuo5213
 * */

import redis from './_redis'
import {KeyType} from "ioredis";

class RedisStore {
  /**
   * set redis
   * @param key KeyType
   * @param value any
   * @param timeout 毫秒为单位
   */
  async set(key: KeyType, value: any, timeout?: number) {
    if (typeof value === "object") {
      value = JSON.stringify(value)
    }
    try {
      if (typeof timeout === 'undefined') {
        return await redis.set(key, value)
      }
      return await redis.setex(key, Math.ceil(timeout / 1000), value)
    } catch (e) {
      // do nothing
    }
  }

  /**
   * get redis
   * @param key
   */
  async get(key: KeyType) {
    const data = await redis.get(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data
      }
    }
  }

  /**
   * del redis
   * @param key
   */
  async delete(key: KeyType) {
    try {
      return await redis.del(key)
    } catch (e) {
      // do nothing
    }
  }
}

export default new RedisStore()
