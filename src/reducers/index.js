import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'

const appReducer = combineReducers({
  routing,
  auth
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET_AUTH') {
        localStorage.clear()
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer