/**
 * @description 博客首页api
 * @author ainuo5213
 */

const Router = require('koa-router')
const {loginCheck} = require('../../middleware/loginChecks')
const {getHomeBlogList, create} = require('../../controller/Home')
const {blogValidate} = require('../../validator/blog')
const {genValidator} = require('../../middleware/validator')
const {getBlogListStr} = require('../../utils/blog')
const router = new Router({
  prefix: '/api/blog'
})
router.post('/create', loginCheck, genValidator(blogValidate), async ctx => {
  const {content, image} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  // controller
  ctx.body = await create({content, image, userId})
})

router.get('/loadMore/:pageIndex', loginCheck, async ctx => {
  let {pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await getHomeBlogList({userId: ctx.session.userInfo.id, pageIndex})
  res.data.blogListTpl = getBlogListStr(res.data.blogList)
  ctx.body = res
})
module.exports = router
