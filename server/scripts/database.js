var mysql = require('mysql')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'vesting',
  password: 'apollo00',
})

module.exports = pool
