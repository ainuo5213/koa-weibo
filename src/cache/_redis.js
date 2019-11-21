/**
 * @description 连接redis数据库
 * @author ainuo5213
 */

const {REDIS_CONFIG} = require('../config/db')
const dev = require('../utils/env')
const Redis = require('ioredis')
const { host, port } = REDIS_CONFIG
const conf = {
  host,
  port
}
if (dev.isProduction) {
  // TODO 生产环境的配置
}
let redis = new Redis(REDIS_CONFIG)
module.exports = {
  redis
}
