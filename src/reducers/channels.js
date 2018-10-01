import { SET_CHANNELS, RESET_CHANNELS } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  data: []
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, data: action.payload.AllChannels }
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
  state.channels.data.length > 0 ? true : false

export const channelsPriortySelector = (state) =>
  state.channels.data
    .sort((prev, next) => prev.Priority - next.Priority)
    .slice(0, 5)
