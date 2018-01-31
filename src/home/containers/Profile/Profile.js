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
    let {name, publicEmail, phone, bio, location, position, instagram, facebook, twitter } = this.state.user
    return (
      <div className="w-50 card">
        <div className="card-body">
          <h5 className="card-title mb-3">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{position}</h6>
          <p className="card-text">{location}</p>
          <p className="card-text">{bio}</p>
        </div>
        <div className="card-footer">
          {instagram !== '' ? <a href={instagram} className="card-link"><i className="fab fa-instagram fa-lg"></i></a> : <a></a>}
          {facebook  !== '' ? <a href={facebook}  className="card-link"><i className="fab fa-facebook-square fa-lg"></i></a> : <a></a>}
          {twitter   !== '' ? <a href={twitter}   className="card-link"><i className="fab fa-twitter fa-lg"></i></a> : <a></a>}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        {this.info()}
            
      </div>
    )
  }
}

export default Profile