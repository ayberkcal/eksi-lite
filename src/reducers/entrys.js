import {
  SET_ENTRYS,
  SET_ENTRYS_STATUS,
  RESET_ENTRYS,
  SET_ENTRY,
  SET_ENTRY_STATUS,
  RESET_ENTRY,
  SET_ENTRY_UPDATE
} from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'

const listdefaultState = {
  data: [],
  info: null,
  page: 1,
  pageTotal: 0,
  pageSize: 0,
  status: 'none'
}

const list = (state = listdefaultState, action = {}) => {
  switch (action.type) {
    case SET_ENTRYS:
      return {
        ...state,
        info: {
          title: action.payload.Title,
          slug: action.payload.Slug,
          isTracked: action.payload.IsTracked,
          isAma: action.payload.IsAmaTopic,
          isTrackable: action.payload.IsTrackable
        },
        data: action.payload.Entries,
        page: action.payload.PageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
      break
    case SET_ENTRY_UPDATE:
      return {
        ...state,
        data:state.data.map(entry => {
          if (entry.Id == action.payload.Id){
            return action.payload
          }

          return entry
        })
      }
    break
    case SET_ENTRYS_STATUS:
      return {
        ...state,
        status: action.payload
      }
      break
    //case LOCATION_CHANGE:
    case RESET_ENTRYS:
      return listdefaultState
      break
    default:
      return state
  }
}

const entrydefaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0,
  status: 'none'
}

const entry = (state = entrydefaultState, action = {}) => {
  switch (action.type) {
    case SET_ENTRY:
      return {
        ...state,
        data: action.payload.Messages.Messages,
        page: action.payload.Messages.pageIndex,
        pageTotal: action.payload.Messages.RowCount,
        pageSize: action.payload.Messages.PageSize
      }
      break
    case SET_ENTRY_STATUS:
      return { ...state, status: action.payload }
      break
    //case LOCATION_CHANGE:
    case RESET_ENTRY:
      return entrydefaultState
      break
    default:
      return state
  }
}

export default combineReducers({
  list,
  entry
})

export const entrysListSelector = (state) => state.entrys.list.data
export const entryListSelector = (state) => state.entrys.entrys.data
export const entrysStatusSelector = (state) => state.entrys.list.status
export const entryStatusSelector = (state) => state.entrys.entry.status
