import { SET_CHANNELS, RESET_CHANNELS } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  list: []
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, list: action.payload.AllChannels }
      break
    //case LOCATION_CHANGE:
    case RESET_CHANNELS:
      return defaultState
      break
    default:
      return state
  }
}

export const fetchedChannelsSelector = (state) =>
  state.channels.list.length > 0 ? true : false

export const channelsPriortySelector = (state) =>
  state.channels.list
    .sort((prev, next) => prev.Priority - next.Priority)
    .slice(0, 5)
