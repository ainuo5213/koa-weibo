"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require('koa');
var app = new Koa();
var views = require('koa-views');
var json = require('koa-json');
var onerror = require('koa-onerror');
var bodyparser = require('koa-bodyparser');
var logger = require('koa-logger');
var index = require('./routes/index');
var users = require('./routes/users');
// error handler
onerror(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
// ejs
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
// logger
// app.use(async (ctx: Context, next: Function) => {
//   const start: Date = new Date();
//   await next();
//   const ms = +new Date() - +start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// });
// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
// error-handling
app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
});
module.exports = app;
