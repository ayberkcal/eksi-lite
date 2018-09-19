import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import Eksi from 'eksi'
import logger from 'redux-logger'
import createBrowserHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'
//import { ErrorTracker } from '../middlewares'

const History = createBrowserHistory()
const eksi = new Eksi({
    uri: 'xx',
    client_secret: 'xxx'
})

const initialState = {}

const middleware = [
  routerMiddleware(History),
  ReduxThunk.withExtraArgument(eksi)
]

if(process.env.NODE_ENV != "production"){
  middleware.push(logger)                
}

const composeEnhancers = 
process.env.NODE_ENV != "production"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const Store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)
  
export { Store, History }