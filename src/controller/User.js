/**
 * @description user controller
 * @author ainuo5213
 */
const {getUserInfo, createUser} = require('../service/user')
const doCrypto = require('../utils/crypto')
const {ErrorModel, SuccessModel} = require('../response/resultModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../response/errorInfo')

class User {
  /**
   * 用户名是否存在
   * @param userName
   * @return {Promise<*>}
   */
  isExist = async userName => {
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
  register = async ({userName, password, gender}) => {
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
}

module.exports = new User()
