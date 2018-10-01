import { SET_TOPICS, RESET_TOPICS } from '../constants'

export function setTopics(payload, extra) {
    return async (dispatch, getState, eksi) => {
        dispatch({ type: SET_TOPICS, payload })
    }
}

export function getTodayTopics(payload) {
    return async (dispatch, getState, eksi) => {
        const response = await eksi.getTodayTopics(payload)

        dispatch(setTopics(response.data))
    }
}

export function getPopularTopics(payload) {
    return async (dispatch, getState, eksi) => {
        const response = await eksi.getPopularTopics(payload)

        dispatch(setTopics(response.data))
    }
}
