import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import App from 'App'
import asyncComponent from 'components/AsyncComponent'

const Login = asyncComponent(() => import(/* webpackChunkName: "login" */ 'views/Login'))
const NotFound = asyncComponent(() => import(/* webpackChunkName: "404" */ 'components/404'))

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={ () => <Redirect to="/front/home" push /> } />
                <Route path="/front/login" render={ () => {
                    const isLogin = false
                    return isLogin ?  <Redirect to="/front/home" /> : 
                        <DocumentTitle title="React Admin Sys">
                            <Login />
                        </DocumentTitle>
                } } />
                <Route path="/front/404" component={ NotFound } />
                <Route render={ () => <App /> } />
            </Switch>
        </Router>
    )
}
