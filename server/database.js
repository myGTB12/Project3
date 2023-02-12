var mysql = require('mysql')
require('dotenv').config()
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  password: 'apollo00',
})

//sao day

module.exports = pool
