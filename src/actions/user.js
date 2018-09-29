import {
  SET_USER,
  RESET_USER,
  SET_USER_FAVORITES,
  RESET_USER_FAVORITES,
  SET_USER_ENTRYS,
  RESET_USER_ENTRYS } from '../constants'

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


export function setUserFavorites(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER_FAVORITES, payload })
  }
}

export function getUserFavoriteEntrys(state) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUserFavorites(`${state.nick}`)
    dispatch(setUserFavorites(response.data))
  }
}

export function setUserEntrys(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_USER_ENTRYS, payload })
  }
}

export function getUserEntrys(state = {}) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getUserEntrys(`${state.nick}`)
    dispatch(setUserEntrys(response.data))
  }
}
