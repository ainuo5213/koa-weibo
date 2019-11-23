/**
 * @description response的返回格式
 * @author ainuo5213
 */

class BaseModel {
  constructor({errorno, data, message}) {
    this.errorno = errorno
    if (data) this.data = data
    if (message) this.message = message
  }
}

class SuccessModel extends BaseModel{
  constructor(data = {}) {
    super({
      errorno: 0,
      data
    })
  }
}

class ErrorModel extends BaseModel{
  constructor({errorno, message}) {
    super({
      errorno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
