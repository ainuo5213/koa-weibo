/**
 * @description 首页test
 * @author ainuo5213
 */
const server = require('../server')
const {Z_COOKIE, Z_USER_NAME} = require('../testUserInfo')
let BLOG_ID
// 创建一条微博
test('创建一条微博应该成功', async () => {
  const content = '这是内容' + Date.now()
  const image = '/xxx.jpg'
  const res = await server.post('/api/blog/create').send({
    content,
    image
  }).set('cookie', Z_COOKIE)
  expect(res.body.errorno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
  // 记录微博id
  BLOG_ID = res.body.data.id
})
test('首页，加载第一页数据', async () => {
  const res = await server
    .get(`/api/blog/loadMore/0`)
    .set('cookie', Z_COOKIE)  // 设置 cookie
  expect(res.body.errorno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
