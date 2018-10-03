import { SET_TOPICS, SET_TOPICS_STATUS, RESET_TOPICS } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0,
  status: 'none'
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_TOPICS:
      return {
        ...state,
        data: action.payload.Topics,
        page: action.payload.PageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
      break
    case SET_TOPICS_STATUS:
      return {
        ...state,
        status: action.payload
      }
      break
    //case LOCATION_CHANGE:
    case RESET_TOPICS:
      return defaultState
      break
    default:
      return state
  }
}

export const topicsStatusSelector = (state) => state.topics.status

export const topicsListSelector = (state) => state.topics.data
