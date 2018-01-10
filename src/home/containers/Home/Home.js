import React, { Component } from 'react'

class Home extends Component {
  componentDidMount() {
    document.title = 'U-Hoop'
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active ">
                <a className="nav-link home" href="#">
                  <i className="fas fa-home"></i>
                  <span className="text">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-comments"></i>
                  <span className="text">Messages</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-bell"></i>
                  <span className="text">Notifications</span>
                </a> 
                
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user"></i>
                  <span className="text">Profile</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Profile</a>
                  <a className="dropdown-item" href="#">Help</a>
                  <a className="dropdown-item" href="#">Settings</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Logout</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-globe"></i>
                  <span className="text">Tours</span>
                </a>
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

      </div>
    )
  }
} 


export default Home 