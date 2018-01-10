import React from 'react'
import './main.css'
import ReactDOM from 'react-dom'
import App from './containers/App/AppContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { configureStore } from './configureStore'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'


const history = createHistory()
const store = configureStore()


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'))