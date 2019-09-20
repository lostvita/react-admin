import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'scss/index.scss'

import Page from 'Page'
import Reducer from 'store'
import * as serviceWorker from './serviceWorker'

const store = createStore(Reducer)

ReactDOM.render(
    <Provider store={ store }>
        <Page />
    </Provider>,
    document.getElementById('root'))

serviceWorker.unregister();
