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
  Z_COOKIE: 'weibo.sid=weibo:sess:bf97390f-ca71-4c9a-a5cc-316bbb44146a; weibo.sid.sig=YqNo1LidJvpZTxKmGwr9dnNWSWY',
  Z_USER_NAME: 'zhangsan',

  L_ID: 2,
  L_COOKIE: 'weibo.sid=weibo:sess:feadfd62-d8fd-4b0b-9f09-6fea6d9e526c; weibo.sid.sig=pteKbHi7x7ziIXApRMjVCQVPkmQ',
  L_USER_NAME: 'lisi'
}
