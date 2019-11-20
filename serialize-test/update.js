const { User } = require('./module');
!(async () => {
  const updateRes = await User.update({
    nickname: '张三1',
  }, {
    where: {
      username: 'zhangsan'
    }
  });
  console.log(updateRes[0] > 0)
})();
