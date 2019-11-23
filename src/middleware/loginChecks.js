/**
 * @description 登陆验证中间件
 * @author ainuo5213
 *
 */
const {ErrorModel} = require('../response/resultModel')
const {loginCheckFailInfo} = require('../response/errorInfo')

/**
 * API登录校验 返回错误信息
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登陆校验 重定向页面
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  const currentURL = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(currentURL))
}


module.exports = {
  loginCheck,
  loginRedirect
}
