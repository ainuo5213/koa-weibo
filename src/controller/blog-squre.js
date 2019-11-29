/**
 * @description 广场页controller
 * @author ainuo5213
 */

const {PAGE_SIZE} = require('../config/constants')
const {SuccessModel} = require('../response/resultModel')
const {getSquareCacheList} = require('../cache/blog')
class Square {
  async getSquareBlogList(pageIndex = 0) {
    // 访问cache
    let res = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const {blogList, count} = res
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      blogList,
      pageSize: PAGE_SIZE,
      pageIndex,
      count
    })
  }
}

module.exports = new Square()
