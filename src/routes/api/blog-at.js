/**
 * Created by 16609 on 2019-12-11
 *
 */
const Router = require('koa-router')
const {loginCheck} = require('../../middleware/loginChecks')
const {getBlogListStr} = require('../../utils/blog')
const {getAtMeBlogList} = require('../../controller/blog-at')
const router = new Router({
  prefix: '/api/atMe'
})
router.get('/loadMore/:pageIndex', loginCheck, async ctx => {
  let {pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  let {id: userId} = ctx.session.userInfo
  const res = await getAtMeBlogList(userId, pageIndex)
  res.data.blogListTpl = getBlogListStr(res.data.blogList)
  ctx.body = res
})

module.exports = router
