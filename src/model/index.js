/**
 * @description 输出模型的文件
 * @author ainuo5213
 */

const User = require('./User')
const Blog = require('./Blog')
// 建立关联关系
Blog.belongsTo(User, {
  foreignKey: 'user_id'
})
// User.hasMany(Blog, {
//   foreignKey: 'user_id'
// })
module.exports = {
  User,
  Blog
}
