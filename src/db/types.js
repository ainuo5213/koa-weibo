/**
 * @description 封装sequelize的数据类型
 * @author ainuo5213
 */

const Seq = require('sequelize')
module.exports = {
  STRING: Seq.STRING,
  DECIMAL: Seq.DECIMAL,
  TEXT: Seq.TEXT,
  INTEGER: Seq.INTEGER,
  BOOLEAN: Seq.BOOLEAN
}
