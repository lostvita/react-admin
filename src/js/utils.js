import { prop, compose, join, filter, keys } from 'ramda'

export const setSessionStore = (key, val) => {
    window.sessionStorage.setItem(key, JSON.stringify(val))
}

export const getSessionStore = key => {
    const val = window.sessionStorage.getItem(key)
    return val ? JSON.parse(val) : null
}

export const className = data => {
    const filterFn = key => !!prop(key, data)
    return compose(join(' '), filter(filterFn), keys)(data)
}

export const randomId = len => {
    const str = 'abcdefghigklmnopqrstuvwxyz0123456789'
    let id = ''
    while (len) {
        const index = Math.floor(Math.random() * Math.floor(str.length))
        id += index % 2 ? str[index].toUpperCase() : str[index].toLowerCase()
        len--
    }
    return id
}