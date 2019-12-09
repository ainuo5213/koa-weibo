/**
 * @description 微博首页controller
 * @author ainuo5213
 */
const {createBlog} = require('../service/blog')
const {SuccessModel, ErrorModel} = require('../response/resultModel')
const {PAGE_SIZE} = require('../config/constants')
const {getFollowerBlogList} = require('../service/blog')
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
    } catch (e) {
      return new ErrorModel(createBlogFailInfo)
    }
  }

  /**
   * 获取第pageIndex页的数据
   * @param userId 当前登录用户的id
   * @param pageIndex 当前页数
   * @return {Promise<void>}
   */
  async getHomeBlogList({userId, pageIndex = 0}) {
    // service
    const res = await getFollowerBlogList(userId, pageIndex, PAGE_SIZE)
    const {count, blogList} = res
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      blogList,
      pageSize: PAGE_SIZE,
      count,
      pageIndex
    })
  }
}

module.exports = new Home()
