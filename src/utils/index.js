

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