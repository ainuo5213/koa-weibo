/**
 * @description 环境变量
 * @author ainuo5213
 * */

const ENV = process.env.NODE_ENV;
export default {
  isDev: ENV === 'development',
  notDev: ENV !== 'development',
  isProduction: ENV === 'production',
  notProduction: ENV !== 'production'
}
