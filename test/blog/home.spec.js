/**
 * @description 首页test
 * @author ainuo5213
 */
const server = require('../server')
const {COOKIE} = require('../testUserInfo')
let BLOG_ID
// 创建一条微博
test('创建一条微博应该成功', async () => {
  const content = '这是内容' + Date.now()
  const image = '/xxx.jpg'
  const res = await server.post('/api/blog/create').send({
    content,
    image
  }).set('cookie', COOKIE)
  expect(res.body.errorno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
  // 记录微博id
  BLOG_ID = res.body.data.id
})