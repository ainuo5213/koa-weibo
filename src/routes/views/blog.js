/**
 * Created by 16609 on 2019-11-26
 *
 */
const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../../middleware/loginChecks')
router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {
    blogData: null
  })
})

module.exports = router
