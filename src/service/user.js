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
  const res = await User.create(formatUser({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  }))
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

/**
 * 更新用户
 * 更新内容
 * @param newPassword
 * @param newNickName
 * @param newPicture
 * @param newCity
 * 查询条件
 * @param userName 以userName进行更新
 * @param password 以password进行更新
 * @return {Promise<void>}
 */
async function updateUser({newPassword, newNickName, newPicture, newCity}, {userName, password}) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }
  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }
  // 执行修改
  const res = await User.update(updateData, {
    where: whereData
  })
  return res[0] > 0 // 修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
