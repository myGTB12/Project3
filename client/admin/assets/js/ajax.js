function buyToken() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/buyToken',
    success: function (data) {
      console.log(data)
    },
  })
}

$('#form-create-pj').submit(function (e) {
  e.preventDefault()
  console.log($(this).serialize())
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/postNum',
    data: $(this).serialize(),
    success: function (data) {
      console.log(data)
    },
  })
})
