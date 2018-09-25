import { CONTENT_LOADING, CONTENT_LOADED } from '../constants'

export function asyncContentLoading() {
    return { type: CONTENT_LOADING }
}

export function asyncContentLoaded() {
    return { type: CONTENT_LOADED }
}