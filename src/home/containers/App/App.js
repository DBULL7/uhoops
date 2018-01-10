import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/HomeContainer'

import NavContainer from '../Nav/NavContainer'

class App extends Component {
  render() {
    return (
      <section>
        <NavContainer/>
        <Switch>
          <Route path='/' render={(history) => {
            return <Home history={history} />
          }} />
        </Switch>
      </section>
    )
  }
}

export default App