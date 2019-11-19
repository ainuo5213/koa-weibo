import {Context} from "koa";

const Router = require('koa-router');
let router = new Router();

router.get('/', async (ctx: Context, next: Function) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
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
