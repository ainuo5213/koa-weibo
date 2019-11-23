/**
 * @description user API
 * @author ainuo5213
 */

const Router = require('koa-router')
const user = require('../../controller/User')

const router = new Router({
  prefix: '/api/user'
})

router.post('/register', async ctx => {
  const {userName, password, gender} = ctx.request.body
  console.log(userName, password, gender)
  ctx.body = await user.register({userName, password, gender})
})
router.post('/isExist', async ctx => {
  const {userName} = ctx.request.body
  ctx.body = await user.isExist(userName)
  // ctx.set('Content-Type', 'application/json')
})
module.exports = router
