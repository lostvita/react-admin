export const doLogin = user => ({
    type: 'LOGIN',
    user
})

export const updateSideBarState = key => ({
    type: 'UPDATE',
    key
})