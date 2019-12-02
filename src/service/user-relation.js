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

module.exports = {
  getUserByFollower
}
