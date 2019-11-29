/**
 * @description 格式化
 * @author ainuo5213
 */
const {default_avatar, REG_FOR_AT_WHO} = require('../config/constants')
const {timeFormat} = require('../utils/dt')
/**
 * 格式化单个用户的头像
 * @param obj 用户对象
 * @return {*}
 */
function _formatUserPic(obj) {
  if (!obj.picture) {
    obj.picture = default_avatar
  }
  return obj
}

/**
 * 格式化所有用户的头像
 * @param list
 */
function formatUser(list) {
  if (!list) {
    return
  }
  if (Array.isArray(list)) {
    return list.map(_formatUserPic)
  }
  return _formatUserPic(list)
}

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (!list) {
    return list
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent)
  }
  // 对象
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
