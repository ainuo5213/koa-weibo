/**
 * @description 用户单元测试的用户信息
 * @author ainuo5213
 */
/**
 * cookie是敏感信息，此处只能是**测试**用户的cookie
 * 每次用户重新登陆都需要改变该测试cookie
 * @type {{COOKIE: string}}
 */
module.exports = {
  Z_ID: 1,
  Z_COOKIE: 'weibo.sid=weibo:sess:90f19cdd-76fe-4331-b287-8a894d6a5403; weibo.sid.sig=pbs4iwoOG-vjcIjQviaJ3zG82WU',
  Z_USER_NAME: 'zhangsan',

  L_ID: 2,
  L_COOKIE: 'weibo.sid=weibo:sess:561966e1-f302-4e8f-a105-8a2c78193df7; weibo.sid.sig=FYhB-Udnr-xd8kKGfhynaMtn1_I',
  L_USER_NAME: 'lisi'
}
