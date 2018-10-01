import { SET_TOPICS, RESET_TOPICS } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
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
    //case LOCATION_CHANGE:
    case RESET_TOPICS:
      return defaultState
      break
    default:
      return state
  }
}

//export const fetchedTopicsSelector = (state) => state.topics.data.length > 0 ? true : false

export const topicsListSelector = (state) => state.topics.data
