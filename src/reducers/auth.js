import { SET_AUTH_LOGIN, RESET_AUTH } from '../constants'

const defaultState = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  token: '',
  user_id: null,
  role: 0,
  isAuth: false
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
      return {
        ...state,
        firstname: action.payload.user.firstname,
        lastname: action.payload.user.lastname,
        email: action.payload.user.email,
        token: action.payload.token.api_token,
        username: action.payload.user.username,
        user_id: action.payload.user.user_id,
        role: action.payload.user.user_group_id,
        teams: action.payload.user.teams,
        isAuth: true
      }
      break
      break
    case RESET_AUTH:
      return state
      break
    default:
      return state
  }
}
