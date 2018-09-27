import {
  SET_ME,
  RESET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET,
  SET_FAVORITES,
  RESET_FAVORITES,
  SET_ENTRYS,
  RESET_ENTRYS
} from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'

const infoDefaultState = {
  entryCounts: {},
  user_id: '',
  facebook: '',
  twitter: '',
  instagram: '',
  picture: '',
  nick: '',
  followerCount: 0,
  followingsCount: 0,
  hasEntryUsedOnSeyler: 0,
  caylak: false,
  banned: false,
  badges: [],
  messageCount: 0,
  eventCount: 0
}

const info = (state = infoDefaultState, action = {}) => {
  switch (action.type) {
    case SET_ME:
      return {
        ...state,
        entryCounts: action.payload.UserInfo.EntryCounts,
        user_id: action.payload.UserInfo.UserIdentifier.Id,
        nick: action.payload.UserInfo.UserIdentifier.Nick,
        twitter: action.payload.UserInfo.TwitterScreenName,
        facebook: action.payload.UserInfo.FacebookScreenName,
        instagram: action.payload.UserInfo.InstagramScreenName,
        picture: action.payload.Picture,
        caylak: action.payload.UserInfo.IsCaylak,
        banned: action.payload.UserInfo.IsBanned,
        followerCount: action.payload.FollowerCount,
        followingsCount: action.payload.FollowingsCount,
        hasEntryUsedOnSeyler: action.payload.HasEntryUsedOnSeyler,
        badges: action.payload.Badges
      }
      break

    case MESSAGE_COUNT_SET:
      return { ...state, messageCount: action.payload }
      break
    case EVENT_COUNT_SET:
      return { ...state, eventCount: action.payload }
      break
    case LOCATION_CHANGE:
    case RESET_ME:
      return infoDefaultState
      break
    default:
      return state
  }
}

const favDefaultState = {
  data: [],
  page: 1
}

const favorites = (state = favDefaultState, action = {}) => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, data: action.payload }
      break
    case LOCATION_CHANGE:
    case RESET_FAVORITES:
      return favDefaultState
      break
    default:
      return state
  }
}

const entrysDefaultState = {
  data: [],
  page: 1
}

const entrys = (state = entrysDefaultState, action = {}) => {
  switch (action.type) {
    case SET_ENTRYS:
      return { ...state, data: action.payload }
      break
    case LOCATION_CHANGE:
    case RESET_ENTRYS:
      return entrysDefaultState
      break
    default:
      return state
  }
}

export default combineReducers({
  info,
  favorites,
  entrys
})

export const nameCharacterSelector = (state) =>
  state.auth.nick.charAt(0).toUpperCase()
