import {Context} from "koa";

const Router = require('koa-router');
let router = new Router();

router.get('/', async (ctx: Context, next: Function) => {
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
});

router.get('/string', async (ctx: Context, next: Function) => {
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx: Context, next: Function) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
