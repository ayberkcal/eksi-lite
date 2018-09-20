import { SET_AUTH, RESET_AUTH } from '../constants'
import { getStorage } from '../utils'

const auth = getStorage('auth')

const defaultState = Object.assign(
  {
    access_token: '',
    expires_in: '',
    nick: '',
    rank: '',
    token_type: '',
    user_id: '',
    
  },
  auth,
  {isAuth: (auth ? true : false)}
)



export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.payload, isAuth: true }
      break
      break
    case RESET_AUTH:
      return state
      break
    default:
      return state
  }
}
