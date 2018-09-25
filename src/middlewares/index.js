//import { setErrorMessage } from '../actions/error'
import { setMessageCount, setEventCount } from '../actions/my'

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

let messageCountTicker = null
let eventCountTicker = null

const WatcherCount = (eksi) => ({dispatch, getState}) => next => async action => {

  if (eksi.env && !messageCountTicker){

    messageCountTicker = setInterval(async () => {
      try {
        let response = await eksi.getMyUnreadMessagesCount()
        if (response.data) {
          dispatch(setMessageCount(response.data))
        }
      } catch (err) {
        console.log(err)
      }
    }, 50000)

  }

  if (eksi.env && !eventCountTicker) {
    eventCountTicker = setInterval(async () => {
      try {
        let response = await eksi.getMyUnreadTopicsCount()
        if (response.data) {
          dispatch(setEventCount(response.data))
        }
      } catch (err) {
        console.log(err)
      }
    }, 50000)
  }

 await next(action)

}


export { ErrorTracker, WatcherCount }
