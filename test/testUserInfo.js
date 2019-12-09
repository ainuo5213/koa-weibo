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
  Z_COOKIE: 'weibo.sid=weibo:sess:adf8c740-af7e-45ba-9eb3-5f229d421fb7; weibo.sid.sig=8_KgpHGMVwl71w-od0O0nEjHYVM',
  Z_USER_NAME: 'zhangsan',

  L_ID: 2,
  L_COOKIE: 'weibo.sid=weibo:sess:07578015-79ee-482a-b53a-9006763e1d5d; weibo.sid.sig=HMYRVeeo47aE910GcmpSiN-1Y9I',
  L_USER_NAME: 'lisi'
}
