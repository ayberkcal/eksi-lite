import {
  SET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET,
  SET_FAVORITES,
  SET_MY_ENTRYS,
  SET_MESSAGES,
  RESET_MESSAGES,
  SET_EVENTS,
  SET_MESSAGE,
  SET_MESSAGES_STATUS,
  SET_MESSAGE_STATUS,
  SET_EVENTS_STATUS
} from '../constants'

export function setMessagesStatus(payload) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_MESSAGES_STATUS, payload })
  }
}

export function setMessageStatus(payload) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_MESSAGE_STATUS, payload })
  }
}

export function setEventsStatus(payload) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_EVENTS_STATUS, payload })
  }
}


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
    dispatch({ type: SET_MY_ENTRYS, payload })
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
    dispatch(setMessagesStatus('success'))
  }
}

export function getMessages(payload) {
  return async (dispatch, getState, eksi) => {
    dispatch(setMessagesStatus('fetching'))
    const response = await eksi.getMessages(payload)
    dispatch(setMessages(response.data))
  }
}

export function setEvents(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_EVENTS, payload })
    dispatch(setEventsStatus('success'))
  }
}

export function getEvents(payload = {}){
  return async (dispatch, getState, eksi) => {
    dispatch(setEventsStatus('fetching'))
    const response = await eksi.getEvents(payload)
    dispatch(setEvents(response.data))
  }
}

export function setMessage(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_MESSAGE, payload })
    let response = await eksi.getMyUnreadMessagesCount()
    dispatch(setMessageCount(response.data))
    dispatch(setMessageStatus('success'))
  }
}

export function getMessage(payload = {}) {
  return async (dispatch, getState, eksi) => {
    dispatch(setMessageStatus('fetching'))
    const response = await eksi.getMessage(payload.nick)
    dispatch(setMessage(response.data))
  }
}