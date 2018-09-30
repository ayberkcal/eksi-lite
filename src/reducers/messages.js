import { SET_MESSAGES, RESET_MESSAGES } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

export default (state = defaultState, action = {}) => {
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
    //case LOCATION_CHANGE:
    case RESET_MESSAGES:
      return defaultState
      break
    default:
      return state
  }
}

export const messagesListSelector = (state) => state.messages.data
export const fetchedMessagesSelector = (state) =>
  state.messages.pageSize > 0 ? true : false
