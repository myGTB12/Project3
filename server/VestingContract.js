const Web3 = require('web3')
require('dotenv').config()
const web3 = new Web3(
  'https://eth-goerli.g.alchemy.com/v2/kVYBbuklR6HV4zruW5si30G82rhR08KS'
)

const abi = require('./ABI/vestingABI.json')
const erc20ABI = require('./ABI/erc20.json')
const wallet = web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATEKEY)

async function getDecimal(tokenAddress) {
  const erc20Contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  const decimal = await erc20Contract.methods.decimals().call()
  return decimal
}

const fundVesting = async function (contractAddress, amountToken) {
  const accounts = await web3.eth.getAccounts()
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const tokenAddress = await VestingContract.methods.token().call()
  const decimal = await getDecimal(tokenAddress)
  const amount = amountToken / Math.pow(10, decimal)
  const fundVesting = VestingContract.methods.fundVesting(amount).send({
    from: accounts[0],
  })
  return fundVesting
}

const claimTokens = async function (contractAddress) {
  const accounts = await web3.eth.getAccounts()
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const claim = VestingContract.methods.claimTokens().send({
    from: accounts[0],
  })
  return claim
}

const setStartTime = async function (contractAddress, startTime) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const setStartTime = VestingContract.methods.setStartTime(startTime).send({
    from: wallet.address,
  })
  return setStartTime
}

const addWhitelistUser = async function (contractAddress, userAddress, amount) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const addUser = VestingContract.methods
    .addWhitelistUser(userAddress, amount)
    .send({
      from: wallet.address,
    })
  return addUser
}

const removeWhitelistUser = async function (contractAddress, userAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const addUser = VestingContract.methods
    .removeWhitelistUser(userAddress)
    .send({
      from: wallet.address,
    })
  return removeUser
}

const projectName = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const projectName = await VestingContract.methods.projectName.call()
  return projectName
}

const token = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const token = await VestingContract.methods.token.call()
  return token
}

const firstRelease = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const firstRelease = await VestingContract.methods.firstRelease.call()
  return firstRelease
}

const startTime = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const startTime = await VestingContract.methods.startTime.call()
  return startTime
}

const totalPeriods = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const totalPeriods = await VestingContract.methods.totalPeriods.call()
  return totalPeriods
}

const timePerPeriod = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const timePerPeriod = await VestingContract.methods.timePerPeriod.call()
  return timePerPeriod
}

const cliff = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const cliff = await VestingContract.methods.cliff.call()
  return cliff
}

const totalTokens = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(abi, contractAddress)
  const totalTokens = await VestingContract.methods.totalTokens.call()
  return totalTokens
}

;(module.exports = fundVesting),
  claimTokens,
  setStartTime,
  addWhitelistUser,
  removeWhitelistUser,
  token,
  projectName,
  startTime,
  totalPeriods,
  firstRelease,
  timePerPeriod,
  cliff,
  totalTokens
