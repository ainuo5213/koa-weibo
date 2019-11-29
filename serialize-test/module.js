const Seq = require('sequelize');
const seq = require('./seq');

const User = seq.define('t_users', {
  username: {
    type: Seq.STRING,
    allowNull: false
  },
  password: {
    type: Seq.STRING,
    allowNull: false,
  },
  nickname: {
    type: Seq.STRING,
    allowNull: false,
    comment: '昵称'
  }
  // 会自动创建createdAt和updatedAt
});
const Blog = seq.define('t_blogs', {
  title: {
    type: Seq.STRING,
    allowNull: false
  },
  content: {
    type: Seq.STRING,
    allowNull: false
  },
  user_id: {
    type: Seq.INTEGER,
    allowNull: false,
  }
});
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasMany(Blog, {
  foreignKey: 'user_id'
});
module.exports = {
  User,
  Blog
};

