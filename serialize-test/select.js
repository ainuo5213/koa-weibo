const {Blog, User} = require('./module');
!(async () => {
  // const zhangsan = await User.findOne({
  //   where: {
  //     username: 'zhangsan'
  //   },
  // });
  // console.log(zhangsan.dataValues);
  // 查询特定的列
  // const zhangsanName = await User.findOne({
  //   attributes: ['username', ['nickname', '昵称']],
  //   where: {
  //     username: 'zhangsan'
  //   },
  // });
  // console.log(zhangsanName.dataValues)
  // const zhangsanBlogList = await Blog.findAll({
  //   where: {
  //     user_id: 6
  //   },
  //   order: [['id', 'DESC']]
  // });
  // console.log(zhangsanBlogList.map(data => data.dataValues))
  // 分页
  // const blogPageList = await Blog.findAll({
  //   limit: 2, // 每次查询2条
  //   offset: 2, // 跳过0条
  //   order: [
  //       ['id', 'desc']
  //   ]
  // });
  // console.log(blogPageList.map(data => data.dataValues))
  // const blogListAndCount = await Blog.findAndCountAll({
  //   limit: 2,
  //   offset: 0,
  //   order: [
  //     ['id', 'desc']
  //   ],
  // });
  // console.log(blogListAndCount.count, blogListAndCount.rows.map(data => data.dataValues))
  // 联表查询1 blog -> user
  const blogListWithUser = await Blog.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['username', ['nickname', '昵称']],
        where: {
          username: 'zhangsan'
        }
      }
    ]
  });
  console.log(blogListWithUser.rows)
  // console.log(blogListWithUser.rows.map(data => {
  //   const blog = data.dataValues;
  //   const user = blog.t_user.dataValues;
  //   blog.t_user = user;
  //   return blog
  // }))
  // const userListWithBlog = await User.findAndCountAll({
  //   attributes: ['username', ['nickname', '昵称']],
  //   include: [
  //     {
  //       model: Blog,
  //     }
  //   ]
  // });
  // console.log(userListWithBlog.count,
  //     userListWithBlog.rows.map(userData => {
  //       const user = userData.dataValues;
  //       const blog = user.blogs.map(blog => blog.dataValues);
  //       user.blogs = blog;
  //       return user
  //     }))
})();
