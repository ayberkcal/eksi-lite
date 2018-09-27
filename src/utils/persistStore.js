import equal from 'deep-equal'

export default class PersistStore {

    constructor(options = {}){

        this.whiteList = options.whiteList
    }

    getKeys(){
        let keys = []

        this.whiteList.forEach( item => {
            keys.push(item.key)
        })

        return keys
    }

    getSyncValue(key){
        try {
            let chunk = localStorage.getItem(`${key}`)
            if (chunk != null) {
            return JSON.parse(chunk)
            }
        } catch (err) {
            return undefined
        }
    }

    getValue(key){
        return new Promise((resolve, reject) => {
            try {
                let chunk = localStorage.getItem(`${key}`)
                if (chunk != null) {
                    resolve(JSON.parse(chunk))
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    setSyncValue(key, value){
        localStorage.setItem(`${key}`, JSON.stringify(value))
    }

    setValue(key, value){
        return new Promise(resolve => {
            localStorage.setItem(`${key}`, JSON.stringify(value))
            resolve()
        })
    }

    remove(){
        localStorage.removeItem(key)
    }

    flush(){
        localStorage.clear()
    }

    size(){
        return localStorage.length
    }

    getStore(){
        let store = {}
        this.whiteList.forEach( item => {
            const value = this.getSyncValue(item.key)
            if (value){
                store[`${item.target}`] = this.getSyncValue(item.key)
            }
            
        })

        return store
    }

    getMiddleware(){
        return ({ dispatch, getState }) => next => async action => { 
            const store = getState()

            const persistKeys = this.getKeys().forEach(key => {
                if (store.hasOwnProperty(key)){
                    if (!equal(store[key], this.getSyncValue(key))) {
                        this.setSyncValue(key, store[key])
                        console.log('SYNC')
                    }
                    
                }
            })

            next(action)
        }
    }

}