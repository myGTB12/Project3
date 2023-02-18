const db = require('./database')

async function getProject() {
  await checkConnectDB()
  return new Promise((resolve, reject) => {
    const a = db.query(
      'SELECT contract_address FROM vesting_contract_address',
      async function (err, result, fileds) {
        if (err) {
          reject(err)
        }
        tx = result.map((item) => item.contract_address)
        resolve(tx)
      }
    )
    console.log(a)
  })
}

async function checkConnectDB() {
  db.getConnection(function (err, connection) {
    if (err) {
      console.log(err)
    }
    console.log('success')
  })
}

db.query(
  'SELECT contract_address FROM vesting_contract_address',
  function (error, results, fields) {
    if (error) throw error
    console.log('Danh sách địa chỉ hợp đồng: ', results)
  }
)
