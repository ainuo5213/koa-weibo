/**
 * @description 用户关系单元测试
 * @author ainuo5213
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {Z_ID, Z_USER_NAME, Z_COOKIE, L_ID, L_USER_NAME, L_COOKIE} = require('../testUserInfo')
// 先取消关注
test('无论如何，取消关注应该成功', async () => {
  const res = await server.post('/api/profile/unFollow').send({userId: L_ID}).set('cookie', Z_COOKIE)
  expect(1).toBe(1)
})
// 关注
test('张三关注李四应该成功', async () => {
  const res = await server.post('/api/profile/follow').send({userId: L_ID}).set('cookie', Z_COOKIE)
  expect(res.body.errorno).toBe(0)
})
// 获取粉丝
test('获取李四的粉丝，应该有张三', async () => {
  const res = await getFans(L_ID)
  const {count, list} = res.data
  const hasZhangSan = list.some(fanInfo => fanInfo.userName === Z_USER_NAME)
  expect(count > 0).toBe(true)
  expect(hasZhangSan).toBe(true)
})
// 获取关注人
test('获取张三的关注人，应该有李四', async () => {
  const res = await getFollowers(Z_ID)
  const {count, userList} = res.data
  const hasLiSi = userList.some(followerInfo => followerInfo.userName === L_USER_NAME)
  expect(count > 0).toBe(true)
  expect(hasLiSi).toBe(true)
})

// 获取at列表
test('获取张三的at列表，应该有李四', async () => {
  const res = await server.get('/api/user/getAtList').set('cookie', Z_COOKIE)
  const atList = res.body
  const hasLiSi = atList.some(item => {
    return item.indexOf(`- ${L_USER_NAME}`)
  })
  expect(hasLiSi).toBe(true)
})


// 取消关注
test('张三取消关注李四应该成功', async () => {
  const res = await server.post('/api/profile/unFollow').send({userId: L_ID}).set('cookie', Z_COOKIE)
  expect(res.body.errorno).toBe(0)
})
