import { SET_USER, RESET_USER } from '../constants'

export function setUser(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER, payload })
  }
}

export function getUser(state) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUser(`${state.nick}`)

    dispatch(setUser(response.data))
  }
}
