import './main.css'
let log = console.log

$('#email-login').on('keydown', () => {
  let email = $('#email-login').val()
  let password = $('#password-login').val()
  if (email.length && password.length) {
    $('#login-btn').prop('disabled', false)
  } else {
    $('#login-btn').prop('disabled', true)
  }
})

$('#password-login').on('keydown', () => {
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
  fetch('/api/v1/account/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
  })
    .then(res => res.json())
    .then(data => {
      log('this is the data: ', data)
      if (data.message === 'Success') {
        window.location.href = '/';
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


$('#name, #email, #password, #confirmPassword').on('keypress keyup keydown focus blur', () => {
  nameLength()
  emailLength()
  // compare()
  let name = $('#name').val()
  let email = $('#email').val()
  if (name.length && email.length > 3 && compare()) {
    $('#signup-btn').prop('disabled', false)
  } else {
    $('#signup-btn').prop('disabled', true)
  }
})


let nameLength = () => {
  let name = $('#name').val()
  if (name.length) {
    $('#name').addClass('border-success')
  } else {
    $('#name').removeClass('border-success')
  }
}

let emailLength = () => {
  let email = $('#email').val()
  if (email.length > 3) {
    $('#email').addClass('border-success')
  } else {
    $('#email').removeClass('border-success')
  }
}

$('#password').on('keypress keyup keydown focus blur', () => {
  let password = $('#password').val()
  // let confirmPassword = $('#confirmPassword').val() 
  if (password.length < 8 && password.length > 1) {
    $('small').removeClass('text-muted')
    $('small').addClass('text-warning')
  } else if (password.length > 7) {
    $('small').removeClass('text-warning')
    $('small').addClass('text-success')
  }
})

let compare = () => {
  let password = $('#password').val()
  let confirmPassword = $('#confirmPassword').val()
  if (password.length < 8 || confirmPassword.length < 8) {
    $('#confirmPassword, #password').removeClass('border-success')
    return false
  }
  if (password !== confirmPassword) {
    $('#confirmPassword, #password').addClass('border-danger')
    return false
  } else {
    $('#confirmPassword, #password').removeClass('border-danger')
    $('#confirmPassword, #password').addClass('border-success')
    return true
  }
}

$("#signup-btn").click(function () {
  let email = $("#email").val()
  let password = $("#password").val()
  let name = $('#name').val()
  fetch('/api/v1/account', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name })
  })
    .then(res => res.json())
    .then(data => {
      log('this is the data: ', data)
      if (data.message === 'Success') {
        window.location.href = '/'
      } else if (data.message === 'Email Taken.') {
        $('#email').removeClass('border-success')
        $("#email").addClass('bg-danger')
      }
    }).catch((err) => {
      log(err)
    })
})




