import React, { Component } from 'react'
import './Profile.css'
let log = console.log 

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    log(this.props.match.params.id)
    fetch(`/api/v1/account/${this.props.match.params.id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      log(data)
      this.setState({user: data})
    }).catch(err => {
      log('Error: ', err)
    })
  }

  info() {
    if (!this.state.user) {
      return <p></p>
    }
    let {name, publicEmail, phone, bio, location, role, instagram, facebook, twitter } = this.state.user
    return (
      <div className="card-body">
        <h5 className="card-title mb-3">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{role}</h6>
        <p className="card-text">{location}</p>
        <p className="card-text">{bio}</p>
        <a href="#" className="card-link">{instagram}</a>
        <a href="#" className="card-link">{facebook}</a>
      </div>
    )
  }

  render() {
    return (
      <div className="col-10">
        <div className="card">
            {this.info()}
        </div>
      </div>
    )
  }
}

export default Profile