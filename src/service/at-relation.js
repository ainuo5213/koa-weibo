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

module.exports = {
  createAtRelation
}
