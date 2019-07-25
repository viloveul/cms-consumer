import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import siteReducer from '@/services/site.reducer'
import authReducer from '@/services/auth.reducer'
import contentReducer from '@/services/content.reducer'

const history = createBrowserHistory()

const reducer = combineReducers({
  site: siteReducer,
  auth: authReducer,
  content: contentReducer,
  router: routerReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export {
  history,
  reducer,
  store
}
