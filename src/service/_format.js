/**
 * @description 格式化
 * @author ainuo5213
 */
const {default_avatar} = require('../config/constants')

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


module.exports = {
  formatUser
}
