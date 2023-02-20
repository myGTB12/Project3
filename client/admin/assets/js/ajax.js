window.onload = function () {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  if (id) {
    getdata()
  }
  setTransaction()
  projectStatus()
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

function setTransaction() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/getTxDetails',
    success: function (data) {
      let string
      string = data
        .map(function (item) {
          const address_from =
            item.address_from.substring(0, 8) +
            '...' +
            item.address_from.substring(36, 42)
          const address_to =
            item.address_to.substring(0, 8) +
            '...' +
            item.address_to.substring(36, 42)
          return `<tr>
          <td>
            <a href="https://goerli.etherscan.io/address/${item.address_from}"> ${address_from} </a>
          </td>
          <td>
            <a href="https://goerli.etherscan.io/address/${item.address_to}"> ${address_to} </a>
          </td>
          <td> ${item.amount} </td>
          <td>
            <a href="https://goerli.etherscan.io/address/${item.token}"> ${item.token} </a>
          </td>
          <td>
          <div class="badge badge-outline-success">Approved</div>
          </td>
          </tr>`
        })
        .join('')
      if (document.getElementById('project-status')) {
        document.getElementById('project-status').innerHTML = string
      }
    },
  })
}

$('#login').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/login',
    data: $(this).serialize(),
    success: function (data) {},
  })
})

$('#form-vesting-pj').submit(function (e) {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/fundVesting/${id}`,
    data: $(this).serialize(),
    success: function (data) {
      if (data) {
        location.reload()
      }
    },
  })
})

function projectStatus() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/vesting_status',
    success: function (data) {
      let string
      string = data
        .map(function (item) {
          let status
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
          <td>
            <a href="https://goerli.etherscan.io/address/${item.contractAddress}"> ${item.contractAddress} </a>
          </td>
          <td> ${item.projectName} </td>
          <td> ${item.totalTokens} </td>` +
            status +
            `</tr>`
          )
        })
        .join('')
      if (document.getElementById('user-list')) {
        document.getElementById('user-list').innerHTML = string
      }
    },
  })
}
