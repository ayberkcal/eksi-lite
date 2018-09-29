import {
  SET_USER,
  RESET_USER,
  SET_USER_FAVORITES,
  RESET_USER_FAVORITES,
  SET_USER_ENTRYS,
  RESET_USER_ENTRYS
} from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultState = {
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
  friend: false,
  block: false,
  banned: false,
  badges: []
}

const info = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_USER:
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
        friend: action.payload.UserInfo.IsBuddy,
        block: action.payload.UserInfo.IsBlocked,
        banned: action.payload.UserInfo.IsBanned,
        followerCount: action.payload.FollowerCount,
        followingsCount: action.payload.FollowingsCount,
        hasEntryUsedOnSeyler: action.payload.HasEntryUsedOnSeyler,
        badges: action.payload.Badges
      }
      break
    case LOCATION_CHANGE:
    case RESET_USER:
      return defaultState
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
    case SET_USER_FAVORITES:
      return {
        ...state,
        data: [...state.data, ...action.payload.Entries],
        page: action.payload.pageIndex,
        pageTotal: action.payload.PageCount
      }
      break
    case LOCATION_CHANGE:
    case RESET_USER_FAVORITES:
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
    case SET_USER_ENTRYS:
      return {
        ...state,
        data: [...state.data, ...action.payload.Entries],
        page: action.payload.pageIndex,
        pageTotal: action.payload.PageCount
      }
      break
    case LOCATION_CHANGE:
    case RESET_USER_ENTRYS:
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

export const entryListSelector = (state) => state.user.entrys.data
export const favsListSelector = (state) => state.user.favorites.data
export const fetchedFavsSelector = (state) =>
  state.user.favorites.data.length > 0 ? true : false
export const fetchedEntrySelector = (state) => (state.user.entrys.data.length > 0 ? true : false)
export const userfetchedSelector = (state) => state.user.info.user_id != '' ? true : false
export const nameCharacterSelector = (state) =>
  state.user.info.nick.charAt(0).toUpperCase()