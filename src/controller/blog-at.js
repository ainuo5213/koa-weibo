/**
 * @description 微博at controller
 * @author ainuo5213
 */
const {getUnReadAtRelationCount} = require('../service/at-relation')
const {SuccessModel} = require('../response/resultModel')
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
}


module.exports = new BlogAt()
