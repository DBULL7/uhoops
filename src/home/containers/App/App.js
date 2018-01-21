import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/HomeContainer'

import EventsContainer from '../Events/EventsContainer'
import SettingsContainer from '../Settings/SettingsContainer'
import ProfileContainer from '../Profile/ProfileContainer'
import NavContainer from '../Nav/NavContainer'

class App extends Component {
  render() {
    return (
      <section>
        <NavContainer/>
        <Switch>
				  <Route exact path='/events' render={(history) => {
				    return <EventsContainer/>
				  }}/>
				  <Route exact path='/settings' render={(history) => {
				    return <SettingsContainer/>
				  }}/>
				  <Route path='/user/:id' render={(props) => {
				    return <ProfileContainer {...props}/>
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