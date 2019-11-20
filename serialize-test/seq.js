const Sequelize = require('sequelize');
const seq = new Sequelize('koa-weibo', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000, // 一个连接最大的空闲时间，若10s未使用则释放该连接,
  //   evict: 1000, // 每隔1s看看有没有空闲连接，若有则释放该连接
  // }
});
module.exports = seq;
