/**
 * @description sequelize 同步
 * @author ainuo5213
 */
const seq = require('./seq')
seq.authenticate()
  .then(() => console.log('connection has been established'))
  .catch(err => console.log('error: ' + err))
seq.sync({
  force: true
}).then(() => {
  process.exit()
})
