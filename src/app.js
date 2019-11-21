const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const index = require('./routes/index')
const users = require('./routes/users')
const RedisStore = require('./cache/redis')
const client = require('./cache/_redis')
// error handler
onerror(app)

// session配置，用于加密
app.keys = ['XTHsyg201314.#$']
const SESSION_CONFIG = {
  key: 'weibo.sid',// session的名字
  store: new RedisStore(client.redis), // sessionStore
  prefix: 'weibo:sess:', // 前缀
  maxAge: 24 * 60 * 60 * 1000, // ttl,
  httpOnly: true,
}
app.use(session(SESSION_CONFIG, app))
// middlewares
app.use(bodyparser({
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
app.use(index.routes()).use(index.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
