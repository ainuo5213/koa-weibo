/**
 * @description 微博数据相关的工具方法
 * @author ainuo5213
 */

const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 获取blog-list.ejs的内容
const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

/**
 * 根据blogList渲染出html字符串
 * @param blogListData 微博列表
 * @param canReplay 是否可以回复
 * @return {String|Promise<String>}
 */
function getBlogListStr(blogListData = [], canReplay = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList: blogListData,
    canReplay
  })
}

module.exports = {
  getBlogListStr
}
