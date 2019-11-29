/**
 * @description blog的service
 * @author ainuo5213
 */
const {Blog, User} = require('../model')
const {formatUser, formatBlog} = require('../service/_format')

/**
 * 创建微博
 * @param content
 * @param imgUrl
 * @param userId
 * @return {Promise<void>}
 */
async function createBlog({content, image, userId}) {
  const res = await Blog.create({
    userId: userId,
    content,
    image
  })
  return res.dataValues
}

/**
 * 获取微博数据
 * @param userName 用户名
 * @param pageIndex 当前页数
 * @param pageSize 一页的微博数量
 * @return {Promise<{count: number, blogList: *[]}>}
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  // 格式化
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
