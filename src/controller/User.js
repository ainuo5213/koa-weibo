/**
 * @description user controller
 * @author ainuo5213
 */
const { getUserInfo } = require('../service/user')
const {ErrorModel, SuccessModel} = require('../response/resultModel')
const {registerUserNameNotExitInfo} = require('../response/errorInfo')
class User {
  isExist = async userName => {
    let userInfo = await getUserInfo(userName);
    if (userInfo) {
      return new SuccessModel(userInfo)
    } else {
      return new ErrorModel(registerUserNameNotExitInfo)
    }
  }

  register = async ctx => {

  }
}

module.exports = new User()
