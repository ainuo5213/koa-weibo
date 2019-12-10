/**
 * @description at用户的关系
 * @author ainuo5213
 */

const seq = require('../db/seq')
const {BOOLEAN, INTEGER} = require('../db/types')
const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读，默认未读'
  }
})

module.exports = AtRelation
