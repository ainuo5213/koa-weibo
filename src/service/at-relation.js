/**
 * @description 微博@用户关系service
 * @author ainuo5213
 */
const {AtRelation} = require('../model')

/**
 * 创建at关系
 * @param blogId 微博id
 * @param userId 用户id
 * @return {Promise<void>}
 */
async function createAtRelation(blogId, userId) {
  const res = await AtRelation.create({
    userId,
    blogId
  })
  return res.dataValues
}

/**
 * 获取at用户的数量（未读的微博）
 * @param userId
 * @return {Promise<void>}
 */
async function getUnReadAtRelationCount(userId) {
  const res = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return res.count
}

module.exports = {
  createAtRelation,
  getUnReadAtRelationCount
}
