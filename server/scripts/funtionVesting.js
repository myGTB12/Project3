const Web3 = require('web3')
require('dotenv').config()
const web3 = new Web3(
  'https://eth-goerli.g.alchemy.com/v2/ze9JoGYLUuG5hH_t9nPuLALX2TKCKlDH'
)
const ABI = require('../../client/admin/assets/abi/ERC20.json')
const vestingabi = require('../ABI/vestingABI.json')

// const wallet = web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATEKEY)

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

const getVestingInfor = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(vestingabi, contractAddress)
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
    contractAddress: contractAddress,
  }
}

async function getDecimal(tokenAddress) {
  const erc20Contract = new web3.eth.Contract(ABI, tokenAddress)
  const decimal = await erc20Contract.methods.decimals().call()
  return decimal
}

const getTxDetails = async function (transaction) {
  const tx = await web3.eth.getTransaction(transaction)
  const input = tx.input
  const address_to = '0x' + input.substr(34, 40)
  const amount = '0x' + input.substr(74, 64)
  const amount_to_num = +amount
  const address_from = tx.from
  const token = tx.to
  const decimal = await getDecimal(token)
  const data = {
    address_to: address_to,
    address_from: address_from,
    amount: amount_to_num / Math.pow(10, decimal),
    token: token,
  }
  return data
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

getTxDetails(
  '0x004e9c7ad17104ce347dd7d3b5410527daa018b2068d600af543c3817818d501'
)
module.exports = {
  sendERC20Token,
  connectMetamask,
  getVestingInfor,
  getTxDetails,
}
