import { map, reduce, pick, keys } from 'ramda'
import routes from 'router/config'
import { getSessionStore } from 'js/utils'

// user初始值，取自sessionStorage
const User = getSessionStore('user') || {
    username: '',
    lastname: '',
    img: '',
    permission: [],
    isAdmin: false
}

export const user = (state=User, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return pick(keys(state), action.user)
        default:
            return state
    }
}

const initSidebar = arr => {
    return map(each => {
        if(each.routes) {
            each.active = false
            each.key = generateKey(each.routes)
            each.routes = initSidebar(each.routes)
        }
        return each
    }, arr)
}

const updateSidebar = (arr, key='') => {
    return map(each => {
        if(key === each.key) {
            each.active = !!!each.active
        } else if(each.routes) {
            each.routes = updateSidebar(each.routes, key)
        }
        return each
    }, arr)
}

const generateKey = arr => {
    return reduce((acc, route) => {
        if(route.routes) {
            acc += generateKey(route.routes)
        } else {
            acc += route.path
        }
        return acc
    }, '', arr)
}

export const sidebarInfo = (state=initSidebar(routes), action) => {
    switch (action.type) {
        case 'UPDATE':
            return updateSidebar(state, action.key)
        default:
            return state
    }
}