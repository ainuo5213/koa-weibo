/**
 * Created by 16609 on 2019-11-26
 *
 */
const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../../middleware/loginChecks')
const {getProfileBlogList} = require('../../controller/Profile')
router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {
    blogData: null
  })
})
router.get('/profile', loginRedirect, async ctx => {
  const {userName} = ctx.session.userInfo
  ctx.redirect('/profile/' + userName)
})
router.get('/profile/:userName', loginRedirect, async ctx => {
  const curUserName = ctx.params.userName
  const res = await getProfileBlogList(curUserName, 0)
  const {isEmpty, blogList, pageSize, pageIndex, count} = res.data
  // 获取微博第一页的数据
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      userInfo: ctx.session.userInfo,
      isMe: ctx.params.userName === ctx.session.userInfo.userName
    }
  })
})

module.exports = router
