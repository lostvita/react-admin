import { prop, compose, join, filter, keys, pick } from 'ramda'

function _curry(fn) {
    const generator = (...args) => {
        return args.length >= fn.length ? fn(...args) : (...arg) => generator(...args, ...arg)
    }
    return generator
}

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

export const isNaN = val => Number.isNaN(val)

function _extractData(include, exclude, data) {
    if(include.length > 0) { // ignore exclude
        return pick(include, data)
    } else if(exclude.length > 0) { // ignore include
        const valKeys = compose(filter(key => !exclude.includes(key)), keys)(data)
        return pick(valKeys, data)
    }
    return data
}

export const extractData = _curry(_extractData)