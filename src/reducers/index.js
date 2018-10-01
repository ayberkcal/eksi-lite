import { routerReducer as routing } from 'react-router-redux' // Todo : remove
import { combineReducers } from 'redux'

import auth from './auth'
import me from './me'
import user from './user'
import channels from './channels'
import messages from './messages'
import topics from './topics'

const appReducer = combineReducers({
  routing,
  auth,
  me,
  user,
  channels,
  messages,
  topics
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_AUTH') {
    localStorage.clear()
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
