import './main.css'
let log = console.log 


$('#logout').on('click', () => {
  window.location = '../../'
})

var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for (var i = 0; i < count; i++) {
  textareas[i].onkeydown = function (e) {
    if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s + 1;
    }
  }
}


$('#createEventButton').on('click', () => {
  let name = $('#eventName').val()
  let location = $('#eventLocation').val()
  let date = $('#eventDate').val()
  let cost = $('#eventCost').val()
  let description = $('#eventDescription').val()

  fetch('/api/v1/event', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({ name: name, location: location, date: date, cost: cost, description: description })
  })
    .then(res => res.json())
    .then(data => {
      log(data)
    }).catch(err => {
      log('Error: ', err)
    })
})