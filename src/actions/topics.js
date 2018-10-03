import { SET_TOPICS, SET_TOPICS_STATUS, RESET_TOPICS } from '../constants'

export function setStatus(payload){
    return async (dispatch, getState, eksi) => {
        dispatch({ type: SET_TOPICS_STATUS, payload })
    }
}

export function setTopics(payload, extra) {
    return async (dispatch, getState, eksi) => {
        dispatch({ type: SET_TOPICS, payload })
        dispatch(setStatus('success'))
    }
}

export function getTodayTopics(payload) {
    return async (dispatch, getState, eksi) => {
        dispatch(setStatus('fetching'))
        const response = await eksi.getTodayTopics(payload)
        dispatch(setTopics(response.data))
    }
}

export function getPopularTopics(payload) {
    return async (dispatch, getState, eksi) => {
        dispatch(setStatus('fetching'))
        const response = await eksi.getPopularTopics(payload)
        return dispatch(setTopics(response.data))
    }
}
