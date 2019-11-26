/**
 * @description 微博内容的格式校验
 * @author ainuo5213
 */

const validate = require('./_validate')
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = {blogValidate}
