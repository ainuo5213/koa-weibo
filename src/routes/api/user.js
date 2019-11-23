/**
 * @description user API
 * @author ainuo5213
 */

const Router = require('koa-router')
const user = require('../../controller/User')
const userValidator = require('../../validator/user')
const {genValidator} = require('../../middleware/validator')
const router = new Router({
  prefix: '/api/user'
})

router.post('/register', genValidator(userValidator), async ctx => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await user.register({userName, password, gender})
})
router.post('/isExist', async ctx => {
  const {userName} = ctx.request.body
  ctx.body = await user.isExist(userName)
  // ctx.set('Content-Type', 'application/json')
})
module.exports = router
