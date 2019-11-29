/**
 * @description 数据模型入口文件
 * @author 双越老师
 */

const User = require('./User')
const Blog = require('./Blog')

User.hasMany(Blog, {
    foreignKey: 'userId'
})
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
module.exports = {
    User,
    Blog,
}
