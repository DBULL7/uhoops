import React, { Component } from 'react'
import './Settings.css'
let log = console.log 

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      team: '',
      phone: '',
      position: '',
      publicEmail: '',
      instagram: '',
      facebook: '',
      twitter: '',
      snapchat: '',
      bio: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    // fetch the users profile info
      let { name, location, team, phone, position, publicEmail, instagram, facebook, twitter, snapchat, bio } = nextProps.user
      this.setState({
        name: name, location: location, team: team, phone: phone, position: position, publicEmail: publicEmail, instagram: instagram, facebook: facebook, twitter: twitter, snapchat: snapchat, bio: bio 
      })
  }

  componentDidMount() {
    if (this.props.user) {
      let { name, location, team, phone, position, publicEmail, instagram, facebook, twitter, snapchat, bio } = this.props.user
      this.setState({
        name: name, location: location, team: team, phone: phone, position: position, publicEmail: publicEmail, instagram: instagram, facebook: facebook, twitter: twitter, snapchat: snapchat, bio: bio
      }) 
    }

  }
  
  updateProfile() {
    let { name, location, team, phone, position, publicEmail, instagram, facebook, twitter, snapchat, bio } = this.state
    // fetch post to api / save it and register response
    fetch('/api/v1/account', {
      method: 'PATCH',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        location: location,
        team: team,
        phone: phone,
        position: position,
        publicEmail: publicEmail,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        snapchat: snapchat,
        bio: bio
      })
    }).then(res => res.json())
      .then(data => {
        let { name, location, team, phone, position, publicEmail, instagram, facebook, twitter, snapchat, bio } = data
        this.setState({
          name: name, location: location, team: team, phone: phone, position: position, publicEmail: publicEmail, instagram: instagram, facebook: facebook, twitter: twitter, snapchat: snapchat, bio: bio
        }) 
        $('#exampleModalCenter').modal('show')
        setTimeout(() => {
          $('#exampleModalCenter').modal('hide') 
        }, 1200);
      }).catch(err => {
        log(err)
      })
  }

  render() {
    return (
      <div className="col-sm-12 settings-container">
        <div className="row" id="settingsRow">
          <div className="col-3">
            <div className="list-group" id="list-tab" role="tablist">
              <a className="list-group-item list-group-item-action active" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
              <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Account</a>
            </div>
          </div>
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active text-white" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Name</label>
                    <input className="form-control" id="inputEmail4" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Location</label>
                    <input className="form-control" id="inputPassword4" value={this.state.location} onChange={(e) => this.setState({location: e.target.value})}/>
                  </div>
                </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress">Team</label>
                      <input className="form-control" id="inputAddress" value={this.state.team} onChange={(e) => this.setState({team: e.target.value})}/>
                    </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress2">Phone</label>
                        <input className="form-control" id="inputAddress2" value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputState">Position</label>
                            <input className="form-control" id="role" value={this.state.position} onChange={(e) => this.setState({position: e.target.value})}/>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="publicEmail">Public Email</label>
                            <input className="form-control" id="publicEmail" value={this.state.publicEmail} onChange={(e) => this.setState({publicEmail: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="instagram">Instagram</label>
                            <input className="form-control" id="instagram" value={this.state.instagram} onChange={(e) => this.setState({instagram: e.target.value})}/>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="facebook">Facebook</label>
                            <input className="form-control" id="facebook" value={this.state.facebook} onChange={(e) => this.setState({facebook: e.target.value})}/>
                          </div>

                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="twitter">Twitter</label>
                            <input className="form-control" id="twitter" value={this.state.twitter} onChange={(e) => this.setState({twitter: e.target.value})}/>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="snapchat">Snapchat</label>
                            <input className="form-control" id="snapchat" value={this.state.snapchat} onChange={(e) => this.setState({snapchat: e.target.value})}/>
                          </div>
                        </div> 
                        <div className="form-row">
                          <div className="form-group">
                            <textarea className="col-md-12" rows="3" placeholder="Bio" value={this.state.bio} onChange={(e) => this.setState({bio: e.target.value})}/>
                            <button className="btn btn-primary" onClick={() => this.updateProfile()}>Update Profile</button>
                          </div>
                        </div>
                      </div>

              <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <button className="btn btn-danger">Delete Account</button>
                <button className="btn btn-warning">Change Password</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-success">
              <div className="modal-header bg-success m-auto border-0 d-flex flex-column align-items-center">
                <h2 className="modal-title text-white mb-3" id="exampleModalLongTitle">
                  <i className="far fa-check-circle fa-3x"></i>
                </h2>
                <h4 className="modal-title text-white">Changes Saved</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings