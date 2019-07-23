import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import { store, history } from '@/store'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
