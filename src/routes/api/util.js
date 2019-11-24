/**
 * @description util api 路由
 * @author ainuo5213
 */

const Router = require('koa-router')
const {loginCheck} = require('../../middleware/loginChecks')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require('../../controller/Util')
const router = new Router({
  prefix: '/api/util'
})

router.post('/upload', loginCheck, koaForm(), async ctx => {
  const file = ctx.req.files['file']
  const {size, path, name, type} = file
  const res = await saveFile({size, filePath: path, name, type})
  ctx.body = res
})
module.exports = router
