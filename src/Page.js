import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import App from 'App'
import AsyncComponent from 'components/AsyncComponent'

const Login = AsyncComponent(() => import(/* webpackChunkName: "login" */ 'views/login'))
const NotFound = AsyncComponent(() => import(/* webpackChunkName: "404" */ 'components/404'))
const AuthError = AsyncComponent(() => import(/* webpackChunkName: "autherror" */ 'components/AuthError'))

class Page extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={ () => <Redirect to="/front/approval/undo" push /> } />
                    <Route path="/front/404" component={ NotFound }/>
                    <Route path="/front/autherror" component={ AuthError } />
                    <Route path="/front/login" render={ () => {
                        const isLogin = false
                        return isLogin ?  <Redirect to="/front/approval/undo" /> : <Login />
                    } } />
                    <Route render={ () => <App /> } />
                </Switch>
            </Router>
        )
    }
}

export default Page