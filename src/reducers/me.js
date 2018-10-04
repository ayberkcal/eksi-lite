import {
  SET_ME,
  RESET_ME,
  MESSAGE_COUNT_SET,
  EVENT_COUNT_SET,
  SET_FAVORITES,
  RESET_FAVORITES,
  SET_ENTRYS,
  RESET_ENTRYS,
  SET_EVENTS,
  RESET_EVENTS
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
    //case LOCATION_CHANGE:
    case RESET_ME:
      return infoDefaultState
      break
    default:
      return state
  }
}

const favDefaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

const favorites = (state = favDefaultState, action = {}) => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        data: [...state.data, ...action.payload.Entries],
        page: action.payload.PageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
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
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

const entrys = (state = entrysDefaultState, action = {}) => {
  switch (action.type) {
    case SET_ENTRYS:
      return {
        ...state,
        data: [...state.data, ...action.payload.Entries],
        page: action.payload.PageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
      break
    case LOCATION_CHANGE:
    case RESET_ENTRYS:
      return entrysDefaultState
      break
    default:
      return state
  }
}

const eventsDefaultState = {
  data: [],
  page: 1,
  pageTotal: 0,
  pageSize: 0
}

const events = (state = eventsDefaultState, action = {}) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        data: [...state.data, ...action.payload.Topics],
        page: action.payload.PageIndex,
        pageTotal: action.payload.PageCount,
        pageSize: action.payload.PageSize
      }
      break
    case LOCATION_CHANGE:
    case RESET_EVENTS:
      return eventsDefaultState
      break
    default:
      return state
  }
}

export default combineReducers({
  info,
  favorites,
  entrys,
  events
})

export const entryListSelector = (state) => state.me.entrys.data
export const favsListSelector = (state) => state.me.favorites.data
export const eventsListSelector = (state) => state.me.events.data
export const fetchedEventsSelector = (state) =>
  state.me.events.pageSize > 0 ? true : false
export const fetchedFavsSelector = (state) =>
  state.me.favorites.data.length > 0 ? true : false
export const fetchedEntrySelector = (state) =>
  state.me.entrys.data.length > 0 ? true : false
export const mefetchedSelector = (state) =>
  state.me.info.user_id != '' ? true : false
export const nameCharacterSelector = (state) =>
  state.auth.nick.charAt(0).toUpperCase()
