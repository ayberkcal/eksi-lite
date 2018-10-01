import {
  SET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET,
  SET_FAVORITES,
  SET_ENTRYS,
  SET_MESSAGES,
  RESET_MESSAGES,
  SET_EVENTS
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

export function setMessages(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_MESSAGES, payload })
  }
}

export function getMessages(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getMessages(payload)
    dispatch(setMessages(response.data))
  }
}

export function setEvents(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_EVENTS, payload })
  }
}

export function getEvents(payload = {}){
  return async (dispatch, getState, eksi) => {
    const response = await eksi.client.get(`v1/index/olay`, {
      p: payload.page ? payload.page : 1
    }) // todo remove after
    dispatch(setEvents(response.data))
  }
}