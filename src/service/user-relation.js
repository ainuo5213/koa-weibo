/**
 * @description 用户关系service
 * @author ainuo5213
 */
const {User, UserRelation} = require('../model')
const {formatUser} = require('./_format')
const Sequelize = require('sequelize')
/**
 * 获取关注该用户的列表，即用户的粉丝
 * @param followerId 被关注人的id
 * @return {Promise<{count: number, list: *[]}>}
 */
async function getUserByFollower(followerId) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            // 过滤掉自己关注自己的情况
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })
  let userList = res.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    count: res.count,
    list: userList
  }
}

/**
 * 添加关注
 * @param userId 当前登陆用户的id
 * @param followerId 要被关注的用户的id
 * @return {Promise<void>}
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 取消关注
 * @param userId
 * @param followerId
 * @return {Promise<boolean>}
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

/**
 * 获取我的关注列表
 * @param userId
 * @return {Promise<{userList: *[], count: number}>}
 */
async function getFollowersByUser(userId) {
  // 通过在UserRelation模型中查找到userId的followerId，然后级联User查询
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture'],
      }
    ],
    where: {
      userId,
      followerId: {
        // 过滤调自己关注自己的情况
        [Sequelize.Op.ne]: userId
      }
    }
  })
  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    return user
  })
  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUserByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
}
