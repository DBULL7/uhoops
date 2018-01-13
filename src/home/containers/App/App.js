import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/HomeContainer'

import CampsContainer from '../Camps/CampsContainer'
import ToursContainer from '../Tours/ToursContainer'
import ProfileContainer from '../Profile/ProfileContainer'
import MessagingContainer from '../Messaging/MessagingContainer'
import NavContainer from '../Nav/NavContainer'

class App extends Component {
  render() {
    return (
      <section>
        <NavContainer/>
        <Switch>
				  <Route exact path='/camps' render={(history) => {
				    return <CampsContainer/>
				  }}/>
				  <Route exact path='/tours' render={(history) => {
				    return <ToursContainer/>
				  }}/>
				  <Route exact path='/profile' render={(history) => {
				    return <ProfileContainer/>
				  }}/>
				  <Route exact path='/messaging' render={(history) => {
				    return <MessagingContainer/>
				  }}/>
          <Route path='/' render={(history) => {
            return <Home history={history} />
          }} />
        </Switch>
      </section>
    )
  }
}

export default App