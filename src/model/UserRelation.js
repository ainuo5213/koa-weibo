/**
 * @description 用户关注关系模型
 * @author aniuo5213
 */

const seq = require('../db/seq')
const {INTEGER, STRING, TEXT} = require('../db/types')
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '关注用户的id'
  }
})

module.exports = UserRelation
