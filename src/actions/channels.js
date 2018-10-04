import {
  SET_CHANNELS,
  RESET_CHANNELS,
} from '../constants'
import { setStatus, setTopics } from './topics'

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


export function getChannel(payload, params) {
    return async (dispatch, getState, eksi) => {
        dispatch(setStatus('fetching'))
        const response = await eksi.getChannel(payload, params)
        return dispatch(setTopics(response.data))
    }
}