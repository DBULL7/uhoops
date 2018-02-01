import './main.css'
let log = console.log 

$('#login').on('click', () => {
  let username = $('#username').val()
  let password = $('#password').val()
  fetch('/api/v1/admin/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ username: username, password: password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Success') {
      window.location = "/admin/dashboard"
    }
  }).catch(err => {
    log('Error: ', err)
  })
})