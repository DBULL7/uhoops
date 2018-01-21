import React, { Component } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    fetch('/api/v1/user', {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        this.setState({ user: data })
        // need to set this in redux store
      })
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="sideNav">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="selected" className="nav-link home">
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink activeClassName="selected" className="nav-link" to={`/user/${this.state.user.id}`}>
                <span className="text">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="selected" className="nav-link" to="/events">
                <span className="text">Events</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="selected" className="nav-link" to="/settings">
                <span className="text">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>

        </div>

      </nav>
      
    )
  }
}

export default Nav