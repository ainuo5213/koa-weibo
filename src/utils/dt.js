/**
 * @description 时间相关的工具函数
 * @author ainuo5213
 */
const {format} = require('date-fns')
function formatTime(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  formatTime
}
