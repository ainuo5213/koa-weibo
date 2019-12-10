/**
 * Created by 16609 on 2019-11-26
 *
 */
const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../../middleware/loginChecks')
const {getSquareBlogList} = require('../../controller/blog-squre')
const {getProfileBlogList} = require('../../controller/Profile')
const {getFans, getFollowers} = require('../../controller/user-relation')
const {isExist} = require('../../controller/User')
const {getHomeBlogList} = require('../../controller/Home')
const {getAtMeCount} = require('../../controller/blog-at')
router.get('/', loginRedirect, async ctx => {
  // 已登录用户的信息
  const userInfo = ctx.session.userInfo
  const {id: userId} = userInfo

  // 获取第一页的数据
  const res = await getHomeBlogList({userId})
  const {isEmpty, blogList, pageSize, pageIndex, count} = res.data
  // 获取粉丝
  // controller
  const fansRes = await getFans(userId)
  const fansData = fansRes.data

  // 获取关注人列表
  const followersRes = await getFollowers(userId)
  const {count: followersCount, userList: list} = followersRes.data

  // 获取at数量
  const atCountRes = await getAtMeCount(userId)
  const {count: atCount} = atCountRes.data

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData,
      followersData: {
        count: followersCount,
        list
      },
      atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})
router.get('/profile', loginRedirect, async ctx => {
  const {userName} = ctx.session.userInfo
  ctx.redirect('/profile/' + userName)
})
router.get('/profile/:userName', loginRedirect, async ctx => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  // 当前网页显示的用户
  let curUserInfo
  const {userName: curUserName} = ctx.params
  // 当前网页显示的用户是否是自己
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errorno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 获取微博第一页的数据
  const res = await getProfileBlogList(curUserName, 0)
  const {isEmpty, blogList, pageSize, pageIndex, count} = res.data

  // 获取粉丝
  // controller
  const fansRes = await getFans(curUserInfo.id)
  const fansData = fansRes.data

  // 我是否关注了此人，从该用户的粉丝列表中是否有我得出我是否关注了ta
  const amIFollowed = fansData.list.some(item => item.userName === myUserName)

  // 获取关注人列表
  const followersRes = await getFollowers(curUserInfo.id)
  const {count: followersCount, userList: list} = followersRes.data

  // 获取@数量
  const atCountRes = await getAtMeCount(myUserInfo.id)
  const {count: atCount} = atCountRes.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData,
      amIFollowed,
      followersData: {
        count: followersCount,
        list
      },
      atCount
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
