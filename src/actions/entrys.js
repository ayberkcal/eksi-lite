import {
  SET_ENTRYS,
  SET_ENTRYS_STATUS,
  RESET_ENTRYS,
  SET_ENTRY,
  SET_ENTRY_STATUS,
  RESET_ENTRY,
  SET_ENTRY_UPDATE
} from '../constants'

export function setEntrysStatus(payload) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_ENTRYS_STATUS, payload })
  }
}

export function setEntrys(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch({ type: SET_ENTRYS, payload })
    dispatch(setEntrysStatus('success'))
  }
}

export function getEntrys(payload, extra) {
  return async (dispatch, getState, eksi) => {
    dispatch(setEntrysStatus('fetching'))
    const response = await eksi.getTopicEntrys(payload, extra)
    dispatch(setEntrys(response.data))
  }
}

export function entryUpdate(payload) {
         return async (dispatch, getState, eksi) => {
           dispatch({ type: SET_ENTRY_UPDATE, payload })
         }
       }

export function setEntryUpdate(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.getEntry(payload)
    if (response.data.Entries){
      dispatch(entryUpdate(response.data.Entries[0]))
    }
  }
}


export function setEntryFavorite(payload){
  return async (dispatch, getState, eksi) => {
    const response = await eksi.setEntryFavorite(payload)
    if (response.data.Success === true){
      dispatch(setEntryUpdate(payload))
    }
  }
}

export function setEntryUnFavorite(payload) {
  return async (dispatch, getState, eksi) => {
    const response = await eksi.setEntryUnfavorite(payload)
    if (response.data.Success === true) {
      dispatch(setEntryUpdate(payload))
    }
  }
}