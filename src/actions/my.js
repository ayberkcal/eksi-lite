import { SET_ME, RESET_ME } from '../constants'

export function setMe(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_ME, payload })
  }
}

export function getMe(state) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getMe()

    dispatch(setMe(response.data))
  }
}
