import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/HomeContainer'

import ToursContainer from '../Tours/ToursContainer'
import NotificationsContainer from '../Notifications/NotificationsContainer'
import ProfileContainer from '../Profile/ProfileContainer'
import MessagingContainer from '../Messaging/MessagingContainer'
import NavContainer from '../Nav/NavContainer'

class App extends Component {
  render() {
    return (
      <section>
        <NavContainer/>
        <Switch>
				  <Route exact path='/home/tours' render={(history) => {
				    return <ToursContainer/>
				  }}/>
				  <Route exact path='/home/notifications' render={(history) => {
				    return <NotificationsContainer/>
				  }}/>
				  <Route exact path='/home/profile' render={(history) => {
				    return <ProfileContainer/>
				  }}/>
				  <Route exact path='/home/messaging' render={(history) => {
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