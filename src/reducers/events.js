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
        default:
            return state
    }
}

export const eventsListSelector = (state) => state.events.data
export const fetchedEventsSelector = (state) =>
    state.events.pageSize > 0 ? true : false
