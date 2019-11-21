/**
 * @description 存储配置，包括redis和mysql
 * @author ainuo5213
 */
import dev from '../utils/env'
import {RedisOptions} from 'ioredis'

let redisConfig: RedisOptions = {
  port: 6379,
  host: '127.0.0.1'
};

if (dev.isProduction) {
  // TODO 生产环境的配置
}

export const REDIS_CONFIG = redisConfig;


