import React, { Component } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/home" activeClassName="active" className="nav-link home">
                <i className="fas fa-home"></i>
                <span className="text">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/home/messaging">
                <i className="fas fa-comments"></i>
                <span className="text">Messages</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/home/notifications">
                <i className="fas fa-bell"></i>
                <span className="text">Notifications</span>
              </NavLink>

            </li>
            <li className="nav-item dropdown">
              <NavLink activeClassName="active" className="nav-link dropdown-toggle" to="/home/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user"></i>
                <span className="text">Profile</span>
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Help</a>
                <a className="dropdown-item" href="#">Settings</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Logout</a>
              </div>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/home/tours">
                <i className="fas fa-globe"></i>
                <span className="text">Tours</span>
              </NavLink>
            </li>
          </ul>
          <div className="input-group searchbar">
            <input type="text" className="form-control" placeholder="Search" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary " type="button">
                <i className="fas fa-search icon" />
              </button>
            </div>
          </div>


        </div>
      </nav>
    )
  }
}

export default Nav