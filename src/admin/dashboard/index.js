import './main.css'
let log = console.log 


$('#logout').on('click', () => {
  window.location = '../../'
})

$('#createEventButton').on('click', () => {
  let name = $('#eventName').val()
  let location = $('#eventLocation').val()
  let date = $('#eventDate').val()
  let cost = $('#eventCost').val()

  fetch('/api/v1/event', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({ name: name, location: location, date: date, cost: cost })
  })
    .then(res => res.json())
    .then(data => {
      log(data)
    }).catch(err => {
      log('Error: ', err)
    })
})