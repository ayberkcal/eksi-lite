import { SET_ME, RESET_ME } from '../constants'
import { LOCATION_CHANGE } from 'react-router-redux'

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
  banned: false,
  badges: []
}

export default (state = defaultState, action = {}) => {
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
    case LOCATION_CHANGE:
    case RESET_ME:
      return defaultState
      break
    default:
      return state
  }
}
