import { SET_AUTH, RESET_AUTH } from '../constants'
import { getStorage, setStorage } from '../utils'

export function setAuth(payload) {
  return (dispatch, getState) => {
    setStorage('auth', payload)    
    dispatch({ type: SET_AUTH, payload })
  }
}

export function resetAuth() {
  return (dispatch, getState) => {
    setStorage('auth', {})    
    dispatch({ type: RESET_AUTH })
  }
}

export function loginSubmit(state) {
  return async (dispatch, getState, eksi) => {
    const { username, password } = state
    
    try {
      const response = await eksi.getAccessToken({username, password})
      dispatch(setAuth(response.data))
    }catch(error){
      console.log(error)
      //const {response: { data }} = error
    }
  }
}
