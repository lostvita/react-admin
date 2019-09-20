import { map, pick, keys, reduce } from 'ramda'
import routes from 'router/config'

/**
 * LOGIN reducer
 */

// user初始值，取自sessionStorage
const User = window.sessionStorage.user ? JSON.parse(window.sessionStorage.user) : {
    username: '',
    lastname: '',
    img: '',
    permission: [],
    isAdmin: false
}
export const userInfo = (state = User, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return pick(keys(state), action.user)
        default:
            return state
    }
}

const generateKey = (arr) => {
    return reduce((acc, route) => {
        if(route.routes) {
            acc += generateKey(route.routes)
        } else {
            acc += route.path
        }
        return acc
    }, '')(arr)
}

const initSideBar = (arr) => {
    return map((each) => {
        if(each.routes) {
            each.active = false
            each.key = generateKey(each.routes)
            initSideBar(each.routes)
        }
        return each
        
    }, arr)
}

const SideBars = initSideBar(routes)

const updateSideBar = (arr, key='') => {
    return map((each) => {
        if(key === each.key) {
            each.active = !!!each.active
        } else if(each.routes) {
            each.routes = updateSideBar(each.routes, key)
        }
        return each
    }, arr)
}

export const sideBarInfo = (state=SideBars, action) => {
    switch (action.type) {
        case 'UPDATE':
            return updateSideBar(state, action.key)
        default:
            return state
    }
}
