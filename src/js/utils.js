export const setSessionStore = (key, val) => {
    window.sessionStorage.setItem(key, JSON.stringify(val))
}

export const getSessionStore = key => {
    const val = window.sessionStorage.getItem(key)
    return val ? JSON.parse(val) : null
}