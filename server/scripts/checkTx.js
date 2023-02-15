const db = require('./database')
const axios = require('axios')

async function checkTXEther() {
  checkConnectDB()
  const decimal = await getDecimals(USDTAddress)

  return new Promise((resolve, reject) => {
    db.query(
      'SELECT transaction_hash FROM transactions LIMIT 50',
      async function (err, result) {
        if (err) {
          reject(err)
        }
        tx_code = result.forEach(async (element) => {
          const tx = await getTransaction(element.transaction_code)

          const input = tx.input
          const address_to = '0x' + input.substr(34, 40)
          const amount = '0x' + input.substr(74, 64)
          const amount_to_num = +amount

          const address_from = tx.from
          const token = tx.to
          const data = {
            address_to: address_to,
            address_from: address_from,
            amount: amount_to_num / Math.pow(10, +decimal),
            token: token,
          }

          try {
            const { data: resData } = await axios({
              method: 'post',
              url: url,
              data: data,
            })
            console.log(resData)
          } catch (err) {
            console.log(err)
          }

          console.log(`${element.id} updated`)
        })
      }
    )
  })
}

async function checkConnectDB() {
  return new Promise(function (resolve, reject) {
    db.getConnection(function (err, connection) {
      if (err) {
        return reject(err)
      }
      return resolve(0)
    })
  })
}
