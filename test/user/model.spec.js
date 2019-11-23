/**
 * @description user model jest
 * @author ainuo5213
 *
 */

const User = require('../../src/model/User')
test('User 模型的各个属性，符合预期', () => {
  // build不会插入数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123456',
    nickName: '张三',
    // gender: 1
    picture: '/xxx.jpg',
    city: '北京'
  })
  // 验证属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.jpg')
  expect(user.city).toBe('北京')
})
