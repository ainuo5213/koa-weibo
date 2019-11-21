/**
 * @description 注册路由
 * @author ainuo5213
 */
const fs = require('fs')
const path = require('path')

const regRouter = server => {
  let data = fs.readdirSync(path.resolve(__dirname, './'))
  for (let file of data) {
    if (file === 'index.js') {
      continue
    }
    const router = require('./' + file)
    server.use(router.routes(), router.allowedMethods())
  }
}
module.exports = regRouter
