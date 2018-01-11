import './main.css'
let log = console.log

$('#email-login').on('blur', () => {
  let email = $('#email-login').val()
  let password = $('#password-login').val()
  if (email.length && password.length) {
    $('#login-btn').prop('disabled', false)
  } else {
    $('#login-btn').prop('disabled', true) 
  }
})

$('#password-login').on('blur', () => {
  let email = $('#email-login').val()
  let password = $('#password-login').val()
  if (email.length && password.length) {
    $('#login-btn').prop('disabled', false)
  } else {
    $('#login-btn').prop('disabled', true)
  }
})

$("#login-btn").click(function () {
  let email = $("#email-login").val()
  let password = $("#password-login").val()
  fetch('http://localhost:3000/api/v1/account/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
  })
  .then(res =>  res.json())
  .then(data => {
    log('this is the data: ', data)
    if (data.message === 'Success') {
      window.location.href = '/home';
    } else if (data.message === 'Wrong Password.') {
      $("#email-login").removeClass('border-danger')
      $("#password-login").addClass('border-danger')
    } else {
      $("#email-login").addClass('border-danger')
    }
  }).catch((err) => {
    log(err)
  })
})




