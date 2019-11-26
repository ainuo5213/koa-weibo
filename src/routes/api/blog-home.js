/**
 * @description 博客首页api
 * @author ainuo5213
 */

const Router = require('koa-router')
const {loginCheck} = require('../../middleware/loginChecks')
const Home = require('../../controller/Home')
const router = new Router({
  prefix: '/api/blog'
})
router.post('/create', loginCheck, async ctx => {
  const {content, image} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  // controller
  ctx.body = await Home.create({content, image, userId})
})
module.exports = router
