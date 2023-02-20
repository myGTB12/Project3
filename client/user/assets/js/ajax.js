window.onload = async function () {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  if (id) {
    getdata()
  }
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
  projectStatus()
}

function userVesting() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/getContractAddress/${id}`,
    data: $(this).serialize(),
    success: function (data) {
      if (data) {
        location.reload()
      }
    },
  })
}

function getdata() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/project-detail/${id}`,
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

function projectStatus() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/vesting_status',
    success: function (data) {
      let string
      string = data
        .map(function (item) {
          let status
          const dateStr = new Date(item.startTime * 1000)
          const date = new Date(dateStr)

          const year = date.getFullYear()
          const month = date.toLocaleString('default', { month: 'short' })
          const day = date.getDate()

          const formattedDate = `${day} ${month} ${year}`
          const timestamp = Date.now()
          if (timestamp > item.startTime) {
            status =
              '<td><label class="badge badge-warning">In progress</label></td>'
          } else if (timestamp < item.startTime) {
            status =
              '<td><label class="badge badge-danger">Pending</label></td>'
          } else if (
            timestamp <
            item.startTime +
              item.cliff +
              item.timePerPeriods * item.totalPeriods
          ) {
            status =
              '<td><label class="badge badge-success">Completed</label></td>'
          }
          return (
            `<tr>
          <td> ${item.projectName} </td>
          <td>
            <a href="https://goerli.etherscan.io/address/${item.tokenAddress}"> ${item.tokenAddress} </a>
          </td>
          <td> ${item.totalTokens} </td>` +
            status +
            `<td> ${formattedDate} </td>
            </tr>`
          )
        })
        .join('')
      if (document.getElementById('user-vesting')) {
        document.getElementById('user-vesting').innerHTML = string
      }
    },
  })
}
