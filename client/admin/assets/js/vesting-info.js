const vestingabi = VESTINGABI
const setToken = async function () {
  const tokenAddress = await token('0x5245306dB39361031993FBB7bc207B447Cb42A08')
  document.getElementById('token').placeholder = tokenAddress
  console.log(tokenAddress)
}

const tokenAddress = async function (contractAddress) {
  const VestingContract = new web3.eth.Contract(vestingabi, contractAddress)
  const token = await VestingContract.methods.token.call()
  console.log(token)
  return token
}
