export const doLogin = user => ({
    type: 'LOGIN',
    user
})

export const updateSidebarState = key => ({
    type: 'UPDATE',
    key
})