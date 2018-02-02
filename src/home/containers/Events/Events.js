import React, { Component } from 'react'
import './Events.css'
let log = console.log 


class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      message: ''
    }
  }

  componentWillMount() {
    fetch('/api/v1/event', {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      this.setState({events: data})
    }).catch(err => log('Error: ', err))
  }

  applyToEvent(eventID) {
    fetch('/api/v1/event', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventID })
    }).then(res => res.json())
    .then(data => {
      if (data.message === 'Success') {
        this.setState({message: 'Applied Successfully'})
        $('#exampleModalCenter').modal('show')
        setTimeout(() => {
          $('#exampleModalCenter').modal('hide')
          fetch('/api/v1/event', {
            method: 'GET',
            credentials: 'include'
          }).then(res => res.json())
            .then(data => {
              this.setState({ events: data })
            }).catch(err => log('Error: ', err))
        }, 1200);
      } else {
        this.setState({message: 'Unapplied Successfully'})
        $('#exampleModalCenter').modal('show')
        setTimeout(() => {
          $('#exampleModalCenter').modal('hide')
          fetch('/api/v1/event', {
            method: 'GET',
            credentials: 'include'
          }).then(res => res.json())
            .then(data => {
              this.setState({ events: data })
            }).catch(err => log('Error: ', err))
        }, 1200);
      }
      
    }).catch(err => log('Error: ', err))
  }

  buttonWords(event) {
    if (this.props.user) {
      if (this.props.user._id) {
        return event.players.includes(`${this.props.user._id}`) ? 'Unapply' : 'Apply' 
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  
  render() {
    return (
      <div className="d-flex flex-column align-items-center">

        {this.state.events.map(event => {
          return (
            <div className="card w-50" key={event._id}> 
              <div className="card-header d-flex justify-content-between">
                {event.date}
                <p>${event.cost}</p>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">{event.name}</h5>
                <h6 className="card-text text-muted">{event.location}</h6>
              </div>
              <div className="card-body">
                <textarea className="form-control event-description" disabled="true" value={event.description}></textarea>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => this.applyToEvent(event._id)}>
                  {this.buttonWords(event)}
                </button>
              </div>
            </div>
          )
        })}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-success">
              <div className="modal-header bg-success m-auto border-0 d-flex flex-column align-items-center">
                <h2 className="modal-title text-white mb-3" id="exampleModalLongTitle">
                  <i className="far fa-check-circle fa-3x"></i>
                </h2>
                <h4 className="modal-title text-white">{this.state.message}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Events