/**
 * @description user API
 * @author ainuo5213
 */

const Router = require('koa-router')
const user = require('../../controller/User')
const userValidator = require('../../validator/user')
const {genValidator} = require('../../middleware/validator')
const {loginCheck} = require('../../middleware/loginChecks')
const {isTest} = require('../../utils/env')
const router = new Router({
  prefix: '/api/user'
})
router.post('/delete', loginCheck, async ctx => {
  if (isTest) {
    // 测试环境下，用户登陆后删除自己
    const {userName} = ctx.session.userInfo
    ctx.body = await user.deleteCurUser(userName)
  } else {
    ctx.body = {
      msg: '当前环境非测试环境'
    }
  }
})
router.post('/register', genValidator(userValidator), async ctx => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await user.register({userName, password, gender})
})
router.post('/isExist', async ctx => {
  const {userName} = ctx.request.body
  ctx.body = await user.isExist(userName)
})
router.post('/login', async ctx => {
  const {userName, password} = ctx.request.body
  ctx.body = await user.login(ctx, userName, password)
})
router.patch('/changeInfo', loginCheck, genValidator(userValidator), async ctx => {
  const {nickName, city, picture} = ctx.request.body
  ctx.body = await user.changeInfo(ctx, {nickName, city, picture})
})
module.exports = router
