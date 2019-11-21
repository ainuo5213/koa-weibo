/**
 * @description 操作redis
 * @author ainuo5213
 */

module.exports = class RedisStore {
  constructor(client) {
    this.client = client
  }

  // 根据sessionId获取redis中存储的session数据
  get = async (key) => {
    // 获取data，此时为序列化的字符串
    const data = await this.client.get(key)
    if (!data) {
      return null
    }
    try {
      // 将字符串转换成json对象
      return JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }

  // 存储session数据到redis
  set = async (key, sessionValue, lifetime) => {
    if (typeof lifetime === 'number') {
      // redis数据库的过期时间是以s为单位所以需要除以1000
      lifetime = Math.ceil(lifetime / 1000)
    }
    try {
      // 序列化对象为字符串进行存储
      const sessionStr = JSON.stringify(sessionValue)
      // 有过期时间，则设置过期时间
      if (lifetime) {
        await this.client.setex(key, lifetime, sessionStr)
      } else {
        await this.client.set(key, sessionStr)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 从redis中删除某个session
  destroy = async (key) => {
    await this.client.del(key)
  }
}


