const Web3 = require('web3')
require('dotenv').config()
const web3 = new Web3(
  'https://eth-goerli.g.alchemy.com/v2/kVYBbuklR6HV4zruW5si30G82rhR08KS'
)
const ABI = require('../../client/admin/assets/abi/ERC20.json')
const vestingabi = require('../ABI/vestingABI.json')

const wallet = web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATEKEY)

const sendERC20Token = async function (tokenAddress, receiver, amount) {
  const tokenContract = new web3.eth.Contract(ABI, tokenAddress)
  var gasprice = await web3.eth.getGasPrice()
  var transfer = tokenContract.methods.transfer(receiver, amount)
  var gasEstimate = await transfer.estimateGas({ from: wallet.address })
  const tx = await transfer.send({
    from: wallet.address,
    gas: web3.utils.toHex(gasEstimate),
    gasPrice: web3.utils.toHex(gasprice),
  })
  console.log(tx)
  return tx
}

const getVestingInfor = async function () {
  const VestingContract = new web3.eth.Contract(
    vestingabi,
    '0x5245306dB39361031993FBB7bc207B447Cb42A08'
  )
  const tokenAddress = await VestingContract.methods.token().call()
  const projectName = await VestingContract.methods.projectName().call()
  const firstRelease = await VestingContract.methods.firstRelease().call()
  const startTime = await VestingContract.methods.startTime().call()
  const totalPeriods = await VestingContract.methods.totalPeriods().call()
  const timePerPeriod = await VestingContract.methods.timePerPeriod().call()
  const cliff = await VestingContract.methods.cliff().call()
  const totalTokens = await VestingContract.methods.totalTokens().call()
  return {
    tokenAddress: tokenAddress,
    projectName: projectName,
    firstRelease: firstRelease,
    startTime: startTime,
    totalPeriods: totalPeriods,
    timePerPeriods: timePerPeriod,
    cliff: cliff,
    totalTokens: totalTokens,
  }
}

const connectMetamask = async function () {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed')
  } else {
    // Connect to MetaMask
    window.ethereum
      .enable()
      .then((accounts) => {
        console.log('MetaMask is connected')
        console.log('Accounts:', accounts)
      })
      .catch((error) => {
        console.error('Error connecting to MetaMask:', error)
      })
  }
}

module.exports = { sendERC20Token, connectMetamask, getVestingInfor }