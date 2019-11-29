/**
 * @description 个人主页api路由
 * @author ainuo5213
 */

const Router = require('koa-router')
const {getProfileBlogList} = require('../../controller/Profile')
const {loginCheck} = require('../../middleware/loginChecks')
const {getBlogListStr} = require('../../utils/blog')
const router = new Router({
  prefix: '/api/profile'
})

router.get('/loadMore/:userName/:pageIndex', loginCheck, async ctx => {
  let {userName, pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await getProfileBlogList(userName, pageIndex)
  res.data.blogListTpl = getBlogListStr(res.data.blogList)
  ctx.body = res
})

module.exports = router
