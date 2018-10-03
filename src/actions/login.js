import { SET_AUTH, RESET_AUTH } from '../constants'
import { persist } from '../utils'

export function setAuth(payload, extra) {
  return async (dispatch, getState, eksi) => {
    eksi.define(payload)

    if (extra) {
      await persist.setValue('remember', extra)
    }

    dispatch({ type: SET_AUTH, payload })
  }
}

export function resetAuth() {
  return async(dispatch, getState) => {
    dispatch({ type: RESET_AUTH })
  }
}

export function loginSubmit(state) {
  return async (dispatch, getState, eksi) => {
    const { username, password, remember } = state
    
    const response = await eksi.getAccessToken({username, password})

    dispatch(setAuth(response.data, (remember ? state : null)))
  
  }
}
