"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('koa-router');
var router = new Router({
    prefix: '/users'
});
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});
router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response';
});
router.get('/profile/:username', function (ctx, next) {
    ctx.body = {
        username: ctx.params.username,
    };
});
router.get('/loadMore/:username/:pageIndex', function (ctx, next) {
    ctx.body = {
        username: ctx.params.username,
        pageIndex: ctx.params.pageIndex
    };
});
router.post('/login', function (ctx, next) {
    var _a = ctx.request.body, username = _a.username, password = _a.password;
    ctx.body = {
        username: username,
        password: password
    };
});
module.exports = router;
