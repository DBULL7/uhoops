import './main.css'
let log = console.log 

window.removePlayer = function (id) {
  let event_id = $('#eventID').text()
  fetch(`/api/v1/event/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({event: event_id})
  }).then(res => res.json())
  .then(data => log(data))
  .catch(err => log('Error: ', err))
}


$('#update').on('click', () => {
  let id = $('#eventID').text()
  let name = $('#name').val()
  let cost = $('#cost').val()
  let description  = $('#description').val()
  let location = $('#location').val()
  let date = $('#date').val()
  fetch('/api/v1/event', {
    method: 'PUT',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      _id: id,
      name: name,
      cost: cost,
      location: location,
      description: description,
      date: date 
    })
  }).then(res => res.json())
  .then(data => {
    if (data.message === 'Success') {
      // green modal or something
    } else {
      // red modal 
    }
  }).catch(err => log('Error: ', err))
})

$('#delete').on('click', () => {
  let id = $('#eventID').text()
  fetch(`/api/v1/event/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(res => res.json())
  .then(data => {
    log(data)
  }).catch(err => log('Error: ', err))
})