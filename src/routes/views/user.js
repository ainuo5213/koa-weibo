/**
 * @description user view路由配置
 * @author ainuo5213
 */
const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../../middleware/loginChecks')

/**
 * 获取登陆信息
 * @param ctx
 */
function getLoginInfo(ctx) {
  const data = {
    isLogin: false
  }
  let userInfo = ctx.session.userInfo
  if (userInfo) {
    data.userName = userInfo.userName
    data.isLogin = true
  }
  return data
}

router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {})
})

router.get('/login', async ctx => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async ctx => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router
