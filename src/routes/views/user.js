/**
 * @description user view路由配置
 * @author ainuo5213
 */
const Router = require('koa-router')
const router = new Router()

router.get('/login', async ctx => {
  await ctx.render('login', {})
})

router.get('/register', async ctx => {
  await ctx.render('register', {})
})

module.exports = router
