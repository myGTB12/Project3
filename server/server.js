const express = require('express')
const app = express()
const cors = require('cors')

const functionVesting = require('./funtionVesting.js')
const bodyParse = require('body-parser')

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

app.listen(3000)
