const {Blog, User} = require('./module');
!(async () => {
  // const zhangsan = await User.create({
  //   nickname: '张三',
  //   username: 'zhangsan',
  //   password: '123456'
  // });
  // console.log(zhangsan.dataValues);
  const blogs = await Blog.create({
    title: '标题5',
    content: ' 内容5',
    user_id: 6
  })
})();
