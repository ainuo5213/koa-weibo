/**
 * @description 微博首页controller
 * @author ainuo5213
 */
const {createBlog} = require('../service/blog')
const {SuccessModel, ErrorModel} = require('../response/resultModel')
const xss = require('xss')
const {
  createBlogFailInfo
} = require('../response/errorInfo')
class Home {
  /**
   * 创建微博
   * @param content
   * @param imgUrl
   * @param userId
   * @return {Promise<void>}
   */
  async create({content, image, userId}) {
    // service
    try {
      const blog = await createBlog({content: xss(content), image, userId})
      return new SuccessModel(blog)
    }catch (e) {
      return new ErrorModel(createBlogFailInfo)
    }
  }
}

module.exports = new Home()
