/**
 * @description 微博at controller
 * @author ainuo5213
 */
const {getUnReadAtRelationCount, getAtUserBlogList, updateRelation} = require('../service/at-relation')
const {SuccessModel, ErrorModel} = require('../response/resultModel')
const {PAGE_SIZE} = require('../config/constants')
class BlogAt {
  /**
   * 获取 @我的微博数量
   * @param userId 用户的id
   * @return {Promise<void>}
   */
  async getAtMeCount(userId) {
    // service
    const count = await getUnReadAtRelationCount(userId)
    return new SuccessModel({
      count
    })
  }

  /**
   * 获取at我的微博列表
   * @param userId 我的id
   * @param pageIndex 页数
   * @return {Promise<void>}
   */
  async getAtMeBlogList(userId, pageIndex = 0) {
    // service
    const {count, blogList} = await getAtUserBlogList({userId, pageIndex, pageSize: PAGE_SIZE})
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      blogList,
      pageSize: PAGE_SIZE,
      count,
      pageIndex
    })
  }

  /**
   * 标记为已读
   * @param userId
   * @return {Promise<void>}
   */
  async markAsRead(userId) {
    // service
    try {
      await updateRelation({newIsRead: true}, {userId, isRead: false})
    } catch (e) {
      console.log(e)
    }

  }

}


module.exports = new BlogAt()
