import persistStore from './persistStore'

export function getStorage(key) {
  try {
    let chunk = localStorage.getItem(`${key}`)
    if (chunk != null) {
      return JSON.parse(chunk)
    }
  } catch (err) {
    return undefined
  }
}

export function setStorage(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data))
}

export const persist = new persistStore({
  whiteList: [
    {
      key: 'auth',
      target: 'auth'
    }
  ]
})
