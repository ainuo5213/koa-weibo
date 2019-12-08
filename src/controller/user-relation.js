/**
 * @description 用户关系controller
 * @author ainuo5213
 */
const {getUserByFollower, addFollower, deleteFollower, getFollowersByUser} = require('../service/user-relation')
const {SuccessModel, ErrorModel} = require('../response/resultModel')
const {addFollowerFailInfo, deleteFollowerFailInfo} = require('../response/errorInfo')
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

  /**
   * 关注
   * @param myId 当前登陆用户的id
   * @param curUserId 要被关注的用户的id
   * @return {Promise<void>}
   */
  async follow(myId, curUserId) {
    // service
    try {
      await addFollower(myId, curUserId)
      return new SuccessModel()
    } catch (e) {
      return new ErrorModel(addFollowerFailInfo)
    }
  }
  async unFollow(myId, curUserId) {
    try {
      await deleteFollower(myId, curUserId)
      return new SuccessModel()
    } catch (e) {
      console.log(e)
      return new ErrorModel(deleteFollowerFailInfo)
    }
  }

  /**
   * 获取关注人列表
   * @param userId
   * @return {Promise<void>}
   */
  async getFollowers(userId) {
    // service
    let res = await getFollowersByUser(userId)
    return new SuccessModel(res)
  }
}

module.exports = new Fans()

