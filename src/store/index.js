import { combineReducers } from 'redux'

import { user, sidebarInfo } from './reducer'

export default combineReducers({
    user,
    sidebarInfo
})