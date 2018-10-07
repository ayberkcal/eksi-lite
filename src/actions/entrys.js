import {
  SET_ENTRYS,
  SET_ENTRYS_STATUS,
  RESET_ENTRYS,
  SET_ENTRY,
  SET_ENTRY_STATUS,
  RESET_ENTRY
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
