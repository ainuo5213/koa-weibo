/**
 * @description 个人主页api路由
 * @author ainuo5213
 */

const Router = require('koa-router')
const {getProfileBlogList} = require('../../controller/Profile')
const {loginCheck} = require('../../middleware/loginChecks')
const {getBlogListStr} = require('../../utils/blog')
const {follow, unFollow} = require('../../controller/user-relation')
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
router.post('/follow', loginCheck, async ctx => {
  // 我的id
  const {id: myId} = ctx.session.userInfo
  // 当前关注人的id
  const {userId: curUserId} = ctx.request.body
  // controller
  let res = await follow(myId, curUserId)
  ctx.body = res
})
router.post('/unFollow', loginCheck, async ctx => {
  // 我的id
  const {id: myId} = ctx.session.userInfo
  // 当前关注人的id
  const {userId: curUserId} = ctx.request.body
  let res = await unFollow(myId, curUserId)
  ctx.body = res
})
module.exports = router
