/**
 * @description 用户数据模型
 * @author ainuo5213
 *
 */

const seq = require('../db/seq')
const {STRING, DECIMAL} = require('../db/types')
const User = seq.define('t_user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别:1(男)2(女)3(保密)，默认保密',
    default: 3
  },
  picture: {
    type: STRING,
    comment: '头像的URL地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})
module.exports = User
