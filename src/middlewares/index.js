import { setMessageCount, setEventCount } from '../actions/my'
import { resetAuth } from '../actions/login'
import { notification } from 'antd'

const ErrorTracker = () => ({ dispatch, getState }) => (next) => async (action) => {
  try {
    const result = await next(action)
    return result
  } catch (error) {
    if (error.response) {
      
      const { response: { data, status} } = error

      if (status === 400) {
        notification.error({
          message: 'Bir Sorun Oluştu',
          description: data.error_description
        })

        dispatch(resetAuth())
      }
      
      if(status === 401){
        notification.error({
          message: 'Giriş Yapmanız Gerekmekte',
          description: data.error_description
        })

        dispatch(resetAuth())
      }

      if(status === 500){
        notification.error({
          message: 'Ekşisözlüğe ulaşılamıyor',
          description: 'daha sonra tekrar deneyin'
        })
      }
    }
    return error
  }
}

let messageCountTicker = null
let eventCountTicker = null

const WatcherCount = (eksi) => ({ dispatch, getState }) => (next) => async (
  action
) => {
  const store = getState()
  if (store.auth.isAuth && !messageCountTicker) {
    messageCountTicker = setInterval(async () => {
      try {
        let response = await eksi.getMyUnreadMessagesCount()

        dispatch(setMessageCount(response.data))

        if (!store.auth.isAuth) {
          clearInterval(messageCountTicker)
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(error)
        }
      }
    }, 50000)
  }

  if (store.auth.isAuth && !eventCountTicker) {
    eventCountTicker = setInterval(async () => {
      try {
        let response = await eksi.getMyUnreadTopicsCount()

        dispatch(setEventCount(response.data))

        if (!store.auth.isAuth) {
          clearInterval(eventCountTicker)
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(error)
        }
      }
    }, 50000)
  }

  await next(action)
}

export { ErrorTracker, WatcherCount }
