/**
 * @description 环境变量
 * @author ainuo5213
 * */
const ENV = process.env.NODE_ENV
module.exports = {
  isDev: ENV === 'development',
  notDev: ENV !== 'development',
  isProduction: ENV === 'production',
  notProduction: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}
