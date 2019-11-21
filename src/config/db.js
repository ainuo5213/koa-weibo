/**
 * @description 存储配置，包括redis和mysql
 * @author ainuo5213
 */

let redisConfig = {
  port: 6379,
  host: '127.0.0.1'
}
let mysqlConfig = {
  host: 'localhost',
  dialect: 'mysql',
  database: 'koa-weibo',
  user: 'root',
  password: '123456',
  max: 5,
  min: 0,
  idle: 10000
}


module.exports = {
  REDIS_CONFIG: redisConfig,
  MYSQL_CONFIG: mysqlConfig
}
