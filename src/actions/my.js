import {
  SET_ME,
  RESET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET
} from '../constants'

export function setMe(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_ME, payload })
  }
}

export function setMessageCount(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: MESSAGE_COUNT_SET, payload })
  }
}

export function setEventCount(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: EVENT_COUNT_SET, payload })
  }
}

export function getMe(state) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getMe()

    dispatch(setMe(response.data))
  }
}
