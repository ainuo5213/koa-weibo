const jwt = require('jsonwebtoken')
const {SECRETE} = require('../config/constants')

const createToken = (payload, options = {
  expiresIn: '1d',
}) => {
  return jwt.sign(payload, SECRETE, options)
}

const decodeToken = token => {
  return jwt.verify(token, SECRETE)
}

module.exports = {
  decodeToken,
  createToken
}
