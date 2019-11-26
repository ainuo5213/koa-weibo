/**
 * @description blog的service
 * @author ainuo5213
 */
const Blog = require('../model/Blog')

/**
 * 创建微博
 * @param content
 * @param imgUrl
 * @param userId
 * @return {Promise<void>}
 */
async function createBlog({content, image, userId}) {
  const res = await Blog.create({
    user_id: userId,
    content,
    image
  })
  return res.dataValues
}


module.exports = {
  createBlog
}
