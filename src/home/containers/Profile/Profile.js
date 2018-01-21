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
  }
  
  render() {
    return (
      <div className="col-10">

      </div>
    )
  }
}

export default Profile