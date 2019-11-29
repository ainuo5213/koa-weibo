/**
 * @description 广场页加载更多
 * @author ainuo5213
 */
const Router = require('koa-router')
const {getSquareBlogList} = require('../../controller/blog-squre')
const {loginCheck} = require('../../middleware/loginChecks')
const {getBlogListStr} = require('../../utils/blog')
const router = new Router({
  prefix: '/api/square'
})

router.get('/loadMore/:pageIndex', loginCheck, async ctx => {
  let {pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await getSquareBlogList(pageIndex)
  res.data.blogListTpl = getBlogListStr(res.data.blogList)
  ctx.body = res
})

module.exports = router
