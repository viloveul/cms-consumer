import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import { store, history } from '@/store'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import * as serviceWorker from '@/serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('viloveul')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
