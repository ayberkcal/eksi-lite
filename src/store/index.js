import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import Eksi from 'eksi'
import logger from 'redux-logger'
import createHashHistory from 'history/createHashHistory'
import rootReducer from '../reducers'
import { persist } from '../utils'
import { WatcherCount } from '../middlewares'

const History = createHashHistory()

const eksi = new Eksi({
  uri: process.env.ClientURL,
  client_secret: process.env.ClientSecret
})

const auth = persist.getSyncValue('auth')
if (auth) {
  eksi.define(auth)
}

if (process.env.NODE_ENV != 'production') {
  window.eksi = eksi
}

const initialState = persist.getStore()

const middleware = [
  routerMiddleware(History),
  WatcherCount(eksi),
  ReduxThunk.withExtraArgument(eksi),
  persist.getMiddleware()
]

if (process.env.NODE_ENV != 'production') {
  middleware.push(logger)
}

const composeEnhancers =
  process.env.NODE_ENV != 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const Store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export { Store, History }
