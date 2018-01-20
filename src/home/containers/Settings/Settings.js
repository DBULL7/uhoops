import React, { Component } from 'react'
import './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <div className="col-sm-10">
        <div className="row">
          <div className="col-4">
            <div className="list-group" id="list-tab" role="tablist">
              <a className="list-group-item list-group-item-action active" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
              <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Account</a>
            </div>
          </div>
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active text-white" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Name</label>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="Name"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Location</label>
                    <input type="text" class="form-control" id="inputPassword4" placeholder="Location"/>
                  </div>
                </div>
                    <div class="form-group">
                      <label for="inputAddress">Team</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="Team"/>
                    </div>
                      <div class="form-group">
                        <label for="inputAddress2">Phone</label>
                        <input type="tel" class="form-control" id="inputAddress2" placeholder="Phone"/>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="inputState">Position</label>
                            <select id="inputState" class="form-control">
                              <option selected>Point Guard</option>
                              <option>...</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label for="publicEmail">Public Email</label>
                            <input type="text" className="form-control" id="publicEmail" placeholder="Public Email"/>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="instagram">Instagram</label>
                            <input className="form-control" id="instagram" placeholder="Instagram"/>
                          </div>
                          <div className="form-group col-md-6">
                            <label for="facebook">Facebook</label>
                            <input className="form-control" id="facebook" placeholder="Facebook"/>
                          </div>

                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="twitter">Twitter</label>
                            <input className="form-control" id="twitter" placeholder="Twitter" />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="snapchat">Snapchat</label>
                            <input className="form-control" id="snapchat" placeholder="Snapchat" />
                          </div>

                        </div> 
                
                            <textarea className="col-md-12" rows="3" placeholder="Bio"/>
                            <button className="btn btn-primary">Update Profile</button>
                      </div>

              <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings