import {
  SET_USER,
  RESET_USER,
  SET_USER_FAVORITES,
  RESET_USER_FAVORITES,
  SET_USER_ENTRYS,
  RESET_USER_ENTRYS
} from '../constants'

export function setUser(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER, payload })
  }
}

export function getUser(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUser(`${payload.nick}`)
    dispatch(setUser(response.data))
  }
}

export function setUserFavorites(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER_FAVORITES, payload })
  }
}

export function getUserFavoriteEntrys(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUserFavorites(`${payload.nick}`)
    dispatch(setUserFavorites(response.data))
  }
}

export function setUserEntrys(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER_ENTRYS, payload })
  }
}

export function getUserEntrys(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUserEntrys(`${payload.nick}`)
    dispatch(setUserEntrys(response.data))
  }
}

export function setUserBlock(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserBlock(payload.nick)
    dispatch(getUser(payload))
  }
}

export function setUserUnblock(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserUnblock(payload.nick)
    dispatch(getUser(payload))
  }
}

export function setUserUnfollow(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserUnfollow(payload.nick)
    dispatch(getUser(payload))
  }
}

export function setUserFollow(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserFollow(payload.nick)
    dispatch(getUser(payload))
  }
}

export function setUserTopicsBlock(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserTopicsBlock(payload.nick)
    dispatch(getUser(payload))
  }
}

export function setUserTopicsUnblock(payload) {
  return async (dispatch, getState, eksi) => {
    await eksi.setUserTopicsUnblock(payload.nick)
    dispatch(getUser(payload))
  }
}
