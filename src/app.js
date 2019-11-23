const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const body = require('koa-body')
// const jwt = require('koa-jwt')
const logger = require('koa-logger')
const session = require('koa-session')
const regApiRouter = require('./routes/api')
const regViewRouter = require('./routes/views')
const errorViewRouter = require('./routes/views/error')
const RedisStore = require('./cache/redis')
const client = require('./cache/_redis')
const {isProduction} = require('./utils/env')
const {SESSION_KEY} = require('./config/constants')
// error handler
let errorConf = {}
if (isProduction) {
  errorConf = {
    redirect: '/error'
  }
}
onerror(app, errorConf)

// app.use(jwt({
//   secret: SECRETE
// }).unless({
//   path: [/^\/login\/users/] // 自定义哪些路径忽略jwt验证
// }))

// session配置，用于加密
app.keys = [SESSION_KEY]
const SESSION_CONFIG = {
  key: 'weibo.sid',// session的名字
  store: new RedisStore(client.redis), // sessionStore
  prefix: 'weibo:sess:', // 前缀
  maxAge: 24 * 60 * 60 * 1000, // ttl,
  httpOnly: true,
}
app.use(session(SESSION_CONFIG, app))
// middlewares
app.use(body({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// routes
regApiRouter(app)
regViewRouter(app)
app.use(errorViewRouter.routes()).use(errorViewRouter.allowedMethods()) // 这个必需在最后面，因为有个404的路由
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
