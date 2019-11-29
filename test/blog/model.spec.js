/**
 * @description 微博数据模型单元测试
 * @author ainuo5213
 */

const Blog = require('../../src/model/Blog')
// 微博数据模型
test('微博数据模型各个属性符合预期', () => {
  const blog = Blog.build({
    userId: 1,
    content: '微博内容',
    image: '/test.jpg',
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('/test.jpg')
})
