/**
 * @description json schema验证中间件
 * @author ainuo5213
 *
 */
const {ErrorModel} = require('../response/resultModel')
const {jsonSchemaFailInfo} = require('../response/errorInfo')

/**
 * 生成json schema 校验的函数
 * @param validateFn 校验的中间件
 * @return {Promise<void>}
 */
function genValidator(validateFn) {
  // 中间件函数
  const validator = async (ctx, next) => {
    // 中间件从左到右依次执行，校验用户数据
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}
