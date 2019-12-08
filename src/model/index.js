/**
 * @description 数据模型入口文件
 * @author 双越老师
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

User.hasMany(Blog, {
  foreignKey: 'userId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})
module.exports = {
  User,
  Blog,
  UserRelation
}
