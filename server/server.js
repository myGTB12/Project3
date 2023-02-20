const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./scripts/database')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })
const functionVesting = require('./scripts/funtionVesting')
const vestingContract = require('./scripts/VestingContract')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post('/login', (req, res) => {
  const { user, password } = req.body
  if (user === 'admin' && password === 'password') {
    res.cookie('loggedIn', 'true')
    res.send('Login successful')
  } else {
    res.send('Invalid username or password')
  }
})

app.get('/getTxDetails', async (req, res) => {
  return new Promise(async (result, reject) => {
    db.query(
      'SELECT transaction_hash FROM transaction LIMIT 5',
      async function (error, results, fields) {
        if (error) throw error
        const transactions = results.map((item) => item.transaction_hash)
        let arr = []
        for (const tx of transactions) {
          const a = await functionVesting.getTxDetails(tx)
          arr.push(a)
        }
        res.send(arr)
      }
    )
  })
})

app.post('/getContractAddress/:id', async (req, res) => {
  const id = req.params.id
  const amount = req.body.amount
  const userAddress = req.body.userAddress

  return new Promise(async (result, reject) => {
    db.query(
      'SELECT contract_address FROM vesting_contract_address WHERE id = ?',
      [id],
      async function (error, results, fields) {
        if (error) throw error
        const contractAddress = results[0].contract_address
        await vestingContract.addWhitelistUser(
          contractAddress,
          userAddress,
          amount
        )
        res.send(true)
      }
    )
  })
})

app.post('/fundVesting/:id', async (req, res) => {
  const id = req.params.id
  const amount = req.body.totalTokens
  return new Promise(async (result, reject) => {
    db.query(
      'SELECT contract_address FROM vesting_contract_address WHERE id = ?',
      [id],
      async function (error, results, fields) {
        if (error) throw error
        const contractAddress = results[0].contract_address
        const fundVesting = await vestingContract.fundVesting(
          contractAddress,
          amount
        )
        // db.query('INSERT INTO transaction (transaction_hash) VALUES (?)', [
        //   fundVesting.transactionHash,
        // ])
        res.send(true)
      }
    )
  })
})

app.get('/project-detail/:id', async (req, res) => {
  const id = req.params.id
  return new Promise(async (result, reject) => {
    db.query(
      'SELECT contract_address FROM vesting_contract_address WHERE id = ?',
      [id],
      async function (error, results, fields) {
        if (error) throw error
        const contractAddress = results[0].contract_address
        const data = await functionVesting.getVestingInfor(contractAddress)
        res.send(data)
      }
    )
  })
})

app.get('/vesting_status', async (req, res) => {
  return new Promise(async (result, reject) => {
    db.query(
      'SELECT contract_address FROM vesting_contract_address LIMIT 5',
      async function (error, results, fields) {
        if (error) throw error
        const address = results.map((item) => item.contract_address)
        let arr = []
        for (const addr of address) {
          const a = await functionVesting.getVestingInfor(addr)
          arr.push(a)
        }
        res.send(arr)
      }
    )
  })
})

app.post('/buy-token', async (req, res) => {
  const token = req.body
  console.log(token)
  res.send(token)
})
app.listen(3000)
