import {
  SET_CHANNELS,
  RESET_CHANNELS,
} from '../constants'

export function setChannels(payload, extra) {
  return async (dispatch, getState, eksi) => {
      dispatch({ type: SET_CHANNELS, payload })
  }
}

export function getChannels(state) {
    return async (dispatch, getState, eksi) => {
        const response = await eksi.getChannels()
      
        dispatch(setChannels(response.data))
    }
}
