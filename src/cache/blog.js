/**
 * @description 微博缓存层
 * @author ainuo5213
 */
const client = require('./_redis')
const RedisStore = require('./redis')
const {getBlogListByUser} = require('../service/blog')
const {PAGE_SIZE} = require('../config/constants')
const redis = new RedisStore(client.redis)
const KEY_PREFIX = 'weibo.square:'

/**
 * 获取广场列表的缓存
 * @param pageIndex
 * @param pageSize
 * @return {Promise<void>}
 */
async function getSquareCacheList(pageIndex, pageSize = PAGE_SIZE) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const cacheList = await redis.get(key)
  if (cacheList && cacheList.length) {
    return cacheList
  }
  // 没有缓存或缓存过期，读取数据库
  const result = await getBlogListByUser({pageSize, pageIndex})
  // 设置缓存，缓存时间是一分钟
  await redis.set(key, result, 60 * 1000)

  return result
}

module.exports = {
  getSquareCacheList
}
