import { isNaN } from './utils'
import { clone } from 'ramda'

class EventEmitter {
    constructor () {
        this._events = Object.create(null)
        this._eventsCount = 0
        this._maxListeners = EventEmitter.MAX_LISTENERS
    }

    static MAX_LISTENERS = 50

    static ProcessEmitWarning (warning) {
        if(console && console.warn) console.warn(warning)
    }

    static RemoveAllListeners (type) {
        const events = this._events
        if(!events.removeListener) {
            if(type === undefined) { // remove all
                this._events = Object.create(null)
                this._eventsCount = 0
            } else {
                --this._eventsCount
                this._eventsCount === 0 ? (this._events = Object.create(null)) : (delete events[type])
            }
        } else {
            if(type === undefined) {
                const keys = Object.keys(events)
                keys.filter(key => key !== 'removeListener').forEach(key => {
                    this.RemoveAllListeners(key)
                })
                this.RemoveAllListeners('removeListener')
                this._events = Object.create(null)
                this._eventsCount = 0
            } else {
                const listeners = events[type]
                if(typeof listeners === 'function') {
                    this.off(type, listeners)
                } else if(listeners !== undefined){
                    listeners !== undefined && listeners.forEach(listener => {
                        this.off(type, listener)
                    })
                }
            }
        }
        return this
    }

    setMaxListeners (num) {
        if (typeof num !== 'number' || num < 0 || isNaN(num)) {
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + num + '.')
        }
        this._maxListeners = num
        return this
    }

    getMaxListeners () {
        return this._maxListeners
    }

    emit (type, ...args) {
        let doError = (type === 'error')
        const events = this._events
        if(events !== undefined) {
            doError = (doError && events.error === undefined)
        } else if(!doError) {
            return false
        }

        if(doError) {
            const er = args.length > 0 ? args[0] : null
            if(er instanceof Error) throw er
            const errMsg = er ? `(${er.message})` : ''
            const err = new Error(`Unhandled error.${errMsg}`)
            err.context = er
            throw err
        }

        const handler = events[type]
        if(handler === undefined) return false
        if(typeof handler === 'function') {
            handler.apply(this, args)
        } else {
            const listeners = clone(handler)
            listeners.forEach(listener => listener.apply(this, args))
        }

        return true
    }

    on (type, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
        }
        const events = this._events
        let existing = events[type]
        if(!existing) {
            existing = events[type] = listener
            ++this._eventsCount
        } else {
            typeof existing === 'function' ? (
                existing = events[type] = [existing, listener]) : (
                    existing.push(listener)
                )
        }
        const m = this._maxListeners
        if(m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true
            var w = new Error(`Possible EventEmitter memory leak detected. ${existing.length} ${String(type)} listeners added. Use emitter.setMaxListeners() to increase limit`)
            w.name = 'MaxListenersExceededWarning'
            w.emitter = this
            w.type = type
            w.count = existing.length
            this.ProcessEmitWarning(w)
        }
        return this
    }

    off (type, listener) {
        const isAll = listener ? false : true
        if (!isAll && listener !== 'function') {
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
        }

        const events = this._events
        const list = events[type]
        if(!list) return this

        if(isAll) return this.RemoveAllListeners(type)

        if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
                this._events = Object.create(null)
            else {
                delete events[type]
                events.removeListener && (this.emit('removeListener', type, list.listener || listener))
            }
        } else if (typeof list !== 'function') {
            let position = -1
            let originalListener = null

            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                    originalListener = list[i].listener
                    position = i
                    break
                }
            }

            if (position < 0) return this

            if (position === 0) {
                list.shift()
            } else {
                list.splice(position, 1)
            }

            if (list.length === 1) events[type] = list[0]

            events.removeListener && (this.emit('removeListener', type, originalListener || listener))
        }
        return this
    }
}

export default EventEmitter