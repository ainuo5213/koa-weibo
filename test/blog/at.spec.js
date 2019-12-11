/**
 * @description 微博at关系test
 * @author ainuo5213
 */
const server = require('../server')
const {L_USER_NAME, L_COOKIE, Z_USER_NAME, Z_COOKIE} = require('../testUserInfo')
let BLOG_ID
test('张三创建一条微博at李四应该成功', async () => {
  const content = '单元测试自动创建的微博 @lisi - ' + L_USER_NAME
  const result = await server.post('/api/blog/create').send({content}).set('cookie', Z_COOKIE)
  expect(result.body.errorno).toBe(0)
  // 记录微博id
  BLOG_ID = result.body.data.id
})

test('获取李四的@列表应该有刚刚张三创建的微博', async () => {
  const res = await server.get('/api/atMe/loadMore/0').set('cookie', L_COOKIE) // 所有列表倒叙排列的
  expect(res.body.errorno).toBe(0)
  const data = res.body.data
  const blogList = data.blogList
  const isHaveCurrentBlog = blogList.some(blog => blog.id === BLOG_ID)
  expect(isHaveCurrentBlog).toBe(true)
})
