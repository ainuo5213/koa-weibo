/**
 * @description error和404的页面路由
 * @author ainuo5213
 */

const Router = require('koa-router')
const router = new Router()

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
