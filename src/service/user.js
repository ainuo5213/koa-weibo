/**
 * @description user service
 * @author ainuo5213
 *
 */

const User = require('../model/User')
const {formatUser} = require('./_format')

/**
 * 获取用户信息
 * @param userName
 * @param password
 * @return {Promise<*>}
 */
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

/**
 * 创建用户
 * @param userName 用户
 * @param password 密码
 * @param gender 默认3
 * @param nickName 可选
 * @return {Promise<void>}
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const res = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return res.dataValues
}

async function deleteUser(userName) {
  const res = await User.destroy({
    where: {
      userName
    }
  })
  // res 返回影响的行数
  return res > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}
