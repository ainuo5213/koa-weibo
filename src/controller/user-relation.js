/**
 * @description 用户关系controller
 * @author ainuo5213
 */
const {getUserByFollower} = require('../service/user-relation')
const {SuccessModel} = require('../response/resultModel')

class Fans {
  /**
   * 根据id获取粉丝列表
   * @param userId
   * @return {Promise<void>}
   */
  async getFans(userId) {
    // service
    const {count, list} = await getUserByFollower(userId)
    // 有粉丝
    return new SuccessModel({
      count,
      list
    })
  }
}

module.exports = new Fans()

