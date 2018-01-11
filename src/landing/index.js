import './main.css'


$("#login-btn").click(function () {
  let email = $("#email-login").val()
  let password = $("#password-login").val()
  fetch('http://localhost:3000/api/v1/account/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
  }).then(res => res.json())
  .then(data => {
    if (data.message === 'Success') {
      window.location.href = '/home';
    }
  }).catch(err => {
    log(err)
  })
})


