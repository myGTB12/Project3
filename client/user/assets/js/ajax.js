window.onload = async function () {
  getdata()
  if (window.ethereum.isConnected()) {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = window.ethereum.selectedAddress
    const display = account.toString()
    document.getElementById('btnConnectMetamask').innerHTML =
      display.substring(0, 5) + '...' + display.substring(38, 42)
    document.getElementById('username').innerHTML =
      display.substring(0, 5) + '...' + display.substring(38, 42)
    username
  }
}
function getdata() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/project-detail',
    success: function (data) {
      document.getElementById('token').value = data.tokenAddress
      document.getElementById('firstRelease').value = data.firstRelease
      document.getElementById('startTime').value = data.startTime
      document.getElementById('cliff').value = data.cliff
      document.getElementById('totalPeriods').value = data.totalPeriods
      document.getElementById('timePerPeriods').value = data.timePerPeriods
      document.getElementById('projectName').innerHTML =
        'Project name: ' + data.projectName
      if (data.totalTokens == 0) {
        document.getElementById('totalTokens').value = data.totalTokens
      } else {
        document.getElementById('totalTokens').value = data.totalTokens
        document.getElementById('totalTokens').readOnly = true
      }
    },
  })
}

function connectMetamask() {
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

function disconnectMetamask() {
  if (window.ethereum && window.ethereum.isConnected()) {
    window.ethereum.disconnect()
  }
}
