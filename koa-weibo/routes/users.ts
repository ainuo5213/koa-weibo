import {Context} from "koa";

const Router = require('koa-router');
const router = new Router({
  prefix: '/users'
});

router.get('/', function (ctx: Context, next: Function) {
  ctx.body = 'this is a users response!'
});

router.get('/bar', function (ctx: Context, next: Function) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
