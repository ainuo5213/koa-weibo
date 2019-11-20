const {Blog, User} = require('./module');
!(async () => {
  // const deleteBlogRes = await Blog.destroy({
  //   where: {
  //     id: 5
  //   }
  // });
  // console.log(deleteBlogRes)
  const deleteUserRes = await User.destroy({
    where: {
      id: 6
    }
  });
  console.log(deleteUserRes)
})();
