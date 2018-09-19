import { SET_AUTH, RESET_AUTH } from '../constants'

export function setAuth(payload) {
  return { type: SET_AUTH, payload }
}

export function resetAuth() {
  return (dispatch, getState) => {
    dispatch({ type: RESET_AUTH })
  }
}

export function loginSubmit(state) {
  return (dispatch, getState, eksi) => {
    const { email, password } = state

    // dispatch(setAuth(res.body.data))
  }
}
