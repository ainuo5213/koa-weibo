/**
 * @description user service
 * @author ainuo5213
 *
 */

const User = require('../model/User')
const {formatUser} = require('./_format')
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOption = {
    userName
  }
  if (password) {
    Object.assign(whereOption, {password})
  }

  // 查询
  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOption,
  })
  if (res === null) {
    // 未找到
    return res
  }

  // 格式化
  let result = formatUser(res.dataValues)
  return result
}

module.exports = {
  getUserInfo
}
