/**
 * @description user controller
 * @author ainuo5213
 */
const {getUserInfo, createUser, deleteUser} = require('../service/user')
const doCrypto = require('../utils/crypto')
const {ErrorModel, SuccessModel} = require('../response/resultModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../response/errorInfo')

class User {
  /**
   * 用户名是否存在
   * @param userName
   * @return {Promise<*>}
   */
  async isExist(userName) {
    let userInfo = await getUserInfo(userName)
    if (userInfo) {
      return new SuccessModel(userInfo)
    } else {
      return new ErrorModel(registerUserNameNotExistInfo)
    }
  }

  /**
   * 注册
   * @param userName
   * @param password
   * @param gender(1男，2女，3保密)
   * @return {Promise<void>}
   */
  async register({userName, password, gender}) {
    let userInfo = await getUserInfo(userName)
    if (userInfo) {
      // 用户名已存在
      return new ErrorModel(registerUserNameExistInfo)
    } else {
      // service 注册
      try {
        await createUser({userName, password: doCrypto(password), gender})
        return new SuccessModel()
      } catch (e) {
        return new ErrorModel(registerFailInfo)
      }
    }
  }

  /**
   * 登陆
   * @param ctx 上下文，用于设置session
   * @param userName
   * @param password
   * @return {Promise<void>}
   */
  async login(ctx, userName, password) {
    // 获取用户信息
    let userInfo = await getUserInfo(userName, doCrypto(password))
    // 有该用户
    if (userInfo) {
      if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
      }
      return new SuccessModel()
    } else {
      return new ErrorModel(loginFailInfo)
    }
  }

  async deleteCurUser(userName) {
    let res = await deleteUser(userName)
    if (res) {
      return new SuccessModel()
    } else {
      return new ErrorModel(deleteUserFailInfo)
    }
  }
}

module.exports = new User()
