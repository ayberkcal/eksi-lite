import { SET_AUTH, RESET_AUTH } from '../constants'
import { persist } from '../utils'
import { notification } from 'antd'

export function setAuth(payload, extra) {
  return async (dispatch, getState, eksi) => {
    eksi.define(payload)

    if (extra) {
      await persist.setValue('remember', extra)
    }

    dispatch({ type: SET_AUTH, payload })
  }
}

export function resetAuth() {
  return async(dispatch, getState) => {
    dispatch({ type: RESET_AUTH })
  }
}

export function loginSubmit(state) {
  return async (dispatch, getState, eksi) => {
    const { username, password, remember } = state
    
    try {
      const response = await eksi.getAccessToken({username, password})
      dispatch(setAuth(response.data, (remember ? state : null)))
    }catch(error){ 
      if(error.response){
        const { response: { data } } = error
        notification.error({
          message: 'Giriş Yapılamadı',
          description: data.error_description
        })
      }
      
    }
  }
}
