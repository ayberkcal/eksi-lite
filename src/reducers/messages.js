import { SET_MESSAGES, RESET_MESSAGES, SET_MESSAGE } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'

const listdefaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

const list = (state = listdefaultState, action = {}) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages,
        page: action.payload.pageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
      break
    case LOCATION_CHANGE:
    case RESET_MESSAGES:
      return listdefaultState
      break
    default:
      return state
  }
}

const messagesdefaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

const message = (state = messagesdefaultState, action = {}) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        data: action.payload.Messages.Messages,
        page: action.payload.Messages.pageIndex,
        pageTotal: action.payload.Messages.RowCount,
        pageSize: action.payload.Messages.PageSize
      }
      break
    case LOCATION_CHANGE:
    case RESET_MESSAGES:
      return messagesdefaultState
      break
    default:
      return state
  }
}


export default combineReducers({
  list,
  message
})

export const messageListSelector = (state) => state.messages.message.data
export const fetchedMessageSelector = (state) =>
  state.messages.message.pageSize > 0 ? true : false
export const messagesListSelector = (state) => state.messages.list.data
export const fetchedMessagesSelector = (state) =>
  state.messages.list.pageSize > 0 ? true : false
