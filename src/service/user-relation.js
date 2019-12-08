/**
 * @description 用户关系service
 * @author ainuo5213
 */
const {User, UserRelation} = require('../model')
const {formatUser} = require('./_format')

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
          followerId
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

async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUserByFollower,
  addFollower,
  deleteFollower
}
