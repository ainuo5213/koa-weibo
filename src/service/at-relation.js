/**
 * @description 微博@用户关系service
 * @author ainuo5213
 */
const {AtRelation, Blog, User} = require('../model')
const {formatBlog, formatUser} = require('../service/_format')

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

/**
 * 未获@用户的微博列表
 * @param userId 用户id
 * @param pageIndex 页码
 * @param pageSize 一页的微博数量
 * @return {Promise<{count: number, blogList: *[]}>}
 */
async function getAtUserBlogList({userId, pageIndex = 0, pageSize = 10}) {
  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId // 要查询的用户id
        }
      },
      {
        model: User, //查询用户信息
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  let blogList = res.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: res.count,
    blogList
  }
}

async function updateRelation(
  {newIsRead}, // 更新的内容
  {userId, isRead} // 更新条件
) {
  // 拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }
  // 拼接查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }
  // 执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })

  return result[0] > 0
}


module.exports = {
  createAtRelation,
  getUnReadAtRelationCount,
  getAtUserBlogList,
  updateRelation
}
