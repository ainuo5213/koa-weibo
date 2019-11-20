const seq = require('./seq');
require('./module');
seq.authenticate()
    .then(() => console.log('connection has been established'))
    .catch(err => console.log('error: ' + err));
seq.sync({
  force: true
}).then(() => {
  process.exit();
});
