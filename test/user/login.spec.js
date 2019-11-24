/**
 * @description user api test
 * @author ainuo5213
 */

const server = require('../server')
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie，绕过jest测试时需要的登陆验证
let COOKIE = ''

// 注册
test('注册一个用户应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errorno).toBe(0)
})

// 重复注册同一个用户
test('重复注册同一个用户应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errorno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({userName})
  expect(res.body.errorno).toBe(0)
})

// json schema检测
test('json schema检测非法应该失败', async () => {
  const res1 = await server.post('/api/user/register').send({
    userName: '123',
    password: 'a',
    gender: 'male'
  })
  expect(res1.body.errorno).not.toBe(0)
})

// 登陆
test('登陆应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errorno).toBe(0)
  // 设置cookie
  COOKIE = res.headers['set-cookie'].join(';')
})
// 修改基本信息

test('修改基本信息应该成功', async () => {
  const res = await server.patch('/api/user/changeInfo').send({
    nickName: '测试昵称',
    city: '测试城市',
    picture: '/test.png'
  }).set('cookie', COOKIE)
  expect(res.body.errorno).toBe(0)
})
// 修改密码应该
test('修改密码应该成功', async () => {
  const res = await server.patch('/api/user/changePassword').send({
    newPassword: `p_${Date.now()}`,
    password
  }).set('cookie', COOKIE)
  expect(res.body.errorno).toBe(0)
})
// 删除
test('删除用户应该成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errorno).toBe(0)
})
// 退出登陆
test('退出登陆应该成功', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE)
  expect(res.body.errorno).toBe(0)
})
// 再次查询用户应该不存在
test('查询注册的用户名应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({userName})
  expect(res.body.errorno).not.toBe(0)
})

