//import { setErrorMessage } from '../actions/error'
//import { resetLogin } from '../actions/login'

const ErrorTracker = ({ dispatch, getState }) => next => async action => {
  try {
    const result = await next(action)
    return result
  } catch (error) {
    if (error.status && error.status === 401) {
      dispatch(resetLogin())
    } else if (error.status && error.status === 500) {
      dispatch(setErrorMessage('Sunucu ile bağlantı kurulamıyor..'))
    }

    if (error.body.error && error.status === 400) {
      dispatch(setErrorMessage(error.body.error))
    }
    if (process.env.NODE_ENV != 'production') {
      console.log(error)
    }

    return error
  }
}

export { ErrorTracker }
