/**
 * @description util controller
 * @author ainuo5213
 */
const MAX_SIZE = 1024 * 1024 * 1024 // 文件最大体积1M
const {ErrorModel, SuccessModel} = require('../response/resultModel')
const {uploadFileSizeFailInfo} = require('../response/errorInfo')
const fse = require('fs-extra')
const path = require('path')
const uploadDir = path.resolve(__dirname, '../../uploads')

fse.pathExists(uploadDir).then(exist => {
  if (!exist) {
    fse.ensureDir(uploadDir)
  }
})

/**
 * 保存图片
 * @param size
 * @param path
 * @param name
 * @param type
 * @return {Promise<ErrorModel|*>}
 */
async function saveFile({size, filePath, name, type}) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath) // 删掉内存中的临时图片
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件到服务器上
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(uploadDir, fileName) // 文件的位置
  await fse.move(filePath, distFilePath)
  const res = new SuccessModel({
    url: '/' + fileName
  })
  return res
}

module.exports = {
  saveFile,
  uploadDir
}
