/**
 *  @description 个人主页controller
 *  @author ainuo5213
 */

const {getBlogListByUser} = require('../service/blog')
const {PAGE_SIZE} = require('../config/constants')
const {SuccessModel} = require('../response/resultModel')

class Profile {
  /**
   * 获取第pageIndex页的微博数据
   * @param userName 用户名
   * @param pageIndex 当前页数
   * @return {Promise<void>}
   */
  async getProfileBlogList(userName, pageIndex = 0) {
    // service
    let res = await getBlogListByUser({userName, pageIndex, pageSize: PAGE_SIZE})
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

module.exports = new Profile()
