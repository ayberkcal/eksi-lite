import {
  SET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET,
  SET_FAVORITES,
  SET_ENTRYS
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

export function setFavorites(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_FAVORITES, payload })
  }
}

export function getFavoriteEntrys(state) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getMyFavorites()
    dispatch(setFavorites(response.data))
  }
}

export function setEntrys(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_ENTRYS, payload })
  }
}

export function getEntrys(state = {}) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getMyEntrys(state)
    dispatch(setEntrys(response.data))
  }
}
