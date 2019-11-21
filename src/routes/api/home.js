const Router = require('koa-router')
const router = new Router()
const {createToken, decodeToken} = require('../../utils/jwt')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: '你好',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      },
      {
        id: 4,
        title: 'ddd'
      },
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/login', async (ctx, next) => {
  let token = createToken({
    username: '包飞',
    nickname: '大剑'
  })
  ctx.body = {
    token,
    code: 0
  }
  ctx.set('Content-Type', 'application/json')
})
router.post('/auth', async (ctx, next) => {
  let token = ctx.header.authorization.split(' ')[1];
  let userInfo = decodeToken(token)
  ctx.body = {
    data: userInfo,
    code: 0
  }
  ctx.set('Content-Type', 'application/json')
})
module.exports = router
