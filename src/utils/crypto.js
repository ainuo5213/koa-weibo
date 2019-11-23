/**
 * @description 加密
 * @author ainuo5213
 */

const crypto = require('crypto')
const {CRYPTO_KEY} = require('../config/constants')
/**
 * md5加密
 * @param{string} content 明文
 */
const md5 = content => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

const doCrypto = content => {
  const str = `password=${content}&key=${CRYPTO_KEY}`
  return md5(str)
}


module.exports = doCrypto
