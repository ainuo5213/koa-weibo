/**
 * @description 个人主页测试
 * @author ainuo5213
 */
const server = require('../server')
const {Z_USER_NAME, Z_COOKIE} = require('../testUserInfo')
test('个人主页加载第一页数据应该成功', async () => {
  const res = await server.get(`/api/profile/loadMore/${Z_USER_NAME}/0`).set('cookie', Z_COOKIE)
  expect(res.body.errorno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
