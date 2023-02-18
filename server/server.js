const express = require('express')
const app = express()
const cors = require('cors')

const functionVesting = require('./scripts/funtionVesting')
const vestingContract = require('./scripts/VestingContract')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/buyToken', async (req, res) => {
  const data = req.body
  const a = await functionVesting(a.token, 1000)
  res.send(a)
})

app.post('/postNum', async (req, res) => {
  const a = req.body
  console.log(a)
  res.send(a)
})

app.post('/fundVesting', async (req, res) => {
  const data = JSON.stringify(req.body)
  console.log('body: ' + a)
  const fundVesting = await vestingContract.fundVesting(data.token, 1000000)
  console.log(fundVesting)
})

app.get('/project-detail', async (req, res) => {
  const data = await functionVesting.getVestingInfor()
  res.send(data)
})

app.listen(3000)
