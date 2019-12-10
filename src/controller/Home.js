/**
 * @description 微博首页controller
 * @author ainuo5213
 */
const {createBlog} = require('../service/blog')
const {SuccessModel, ErrorModel} = require('../response/resultModel')
const {PAGE_SIZE, REG_FOR_AT_WHO} = require('../config/constants')
const {getFollowerBlogList} = require('../service/blog')
const {getUserInfo} = require('../service/user')
const {createAtRelation} = require('../service/at-relation')
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
    // 分析content中的@用户
    // content格式如 'hello @nickName - userName 你好'
    let atUserNameList = []
    content = content.replace(REG_FOR_AT_WHO, (matchedStr, nickName, userName) => {
      atUserNameList.push(userName)
      return matchedStr // 替换不生效，只是为了拿到用户名
    })
    // 根据@的用户查询用户信息得到用户id
    const atUserList = await Promise.all(
      // 得到每一个userName对应的Promise
      atUserNameList.map(userName => getUserInfo(userName))
    )
    const atUserIdList = atUserList.map(user => user.id)
    // service
    try {
      // 创建微博
      const blog = await createBlog({content: xss(content), image, userId})
      // 创建@关系，微博内容中@的人和微博创建关系
      // service
      const atUserList = await Promise.all(
        atUserIdList.map(userId => createAtRelation(blog.id, userId))
      )
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
