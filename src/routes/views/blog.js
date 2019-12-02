/**
 * Created by 16609 on 2019-11-26
 *
 */
const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../../middleware/loginChecks')
const {getSquareBlogList} = require('../../controller/blog-squre')
const {getProfileBlogList} = require('../../controller/Profile')
const {getFans} = require('../../controller/user-relation')
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
  // 获取粉丝
  // controller
  const fansRes = await getFans(ctx.session.userInfo.id)
  const fansData = fansRes.data
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
      isMe: ctx.params.userName === ctx.session.userInfo.userName,
      fansData
    }
  })
})

router.get('/square', loginRedirect, async ctx => {
  const res = await getSquareBlogList(0)
  const {isEmpty, blogList, pageSize, pageIndex, count} = res.data
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })

})
module.exports = router
