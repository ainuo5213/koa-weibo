/**
 * @description sequelize实例
 * @author ainuo5213
 */
const Sequelize = require('sequelize')
const {MYSQL_CONFIG} = require('../config/db')
const dev = require('../utils/env')
const {host, dialect, idle, min, max, password, database, user} = MYSQL_CONFIG
const conf = {
  host: host,
  dialect: dialect,
  logging: () => {}
}
if (dev.isProduction) {
  conf.pool = {
    max: max, // 最大连接数
    min: min, // 最小连接数
    idle: idle,  // 连接最久未被使用的时长，超过改时长该连接被释放
  }
}
const seq = new Sequelize(database, user, password, conf)
module.exports = seq
