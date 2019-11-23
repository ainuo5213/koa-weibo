/**
 * @description json schema 校验
 * @author ainuo5213
 */
const Ajv = require('ajv')
const ajv = new Ajv({
  // 输出所有的错误
  // allErrors: true
})

/**
 * 校验方法
 * @param schema 规则
 * @param data 校验的数据
 */
const validate = (schema, data = {}) => {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
