window.onload = function () {
  getdata()
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

function buyToken() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/buyToken',
    success: function (data) {
      console.log(data)
    },
  })
}

function connectMetamask() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/connectMetamask',
    success: function (data) {
      console.log('Connect success')
    },
  })
}

$('#form-buy-token').submit(function (e) {
  e.preventDefault()
  console.log($(this).serialize())
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/buyToken',
    data: $(this).serialize(),
    success: function (data) {
      console.log(data)
    },
  })
})
