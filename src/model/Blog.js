/**
 * @description 微博数据模型
 * @author ainuo5213
 */

const seq = require('../db/seq')
const {TEXT, STRING, INTEGER} = require('sequelize')

const Blog = seq.define('t_blogs', {
  user_id: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allow: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})
module.exports = Blog
