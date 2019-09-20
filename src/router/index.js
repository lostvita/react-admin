import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import queryString from 'query-string'
import { flatten, map, prop, path } from 'ramda'
import { connect } from 'react-redux'

import routesConf from './config'
import views from 'views'
import asyncComponent from 'components/AsyncComponent'
const AuthError = asyncComponent(() => import(/* webpackChunkName: "permissionError" */ "components/AuthError"))


class CRouter extends Component {

    checkPermission (auth, permissions) {
        const isAdmin = path(['user', 'permission'], this.props)  // 超管标识（从redux取）
        if(isAdmin) return true
        const notUndefined = typeof permissions !== 'undefined'
        if(Array.isArray(auth)) {
            return notUndefined && auth.every(each => permissions.includes(each))
        } else if(auth instanceof RegExp) {
            return notUndefined && permissions.some(each => auth.test(each))
        }
        return notUndefined && permissions.includes(auth)
    }

    requirePermission (permission, component) {
        const { user } = this.props
        const permissions = user.permission || [] // 用户权限（从redux取）
        if(!permissions || !this.checkPermission(permission, permissions)) return <Redirect to="/front/autherror" />
        return component
    }

    requireLogin (component, permission) {
        const { user } = this.props
        const isLogin = user.username || null  // 登录标识（从redux取）
        if(!isLogin) { // 判断是否登录
            return <Redirect to={'/front/login'} />
        }
        return permission ? this.requirePermission(permission, component) : component
    }

    generateRoute (routes = [], title = 'React Admin') {
        return map((each) => (
            each.component ? (
                <Route 
                    key={each.path}
                    exact
                    path={each.path}
                    render={ props => {
                        const reg = /\?\S*/g;
                        // 匹配?及其以后字符串
                        const queryParams = window.location.hash.match(reg)
                        // 去除?的参数
                        const { params } = props.match
                        Object.keys(params).forEach(key => {
                            params[key] = params[key] && params[key].replace(reg, '')
                        })
                        props.match.params = { ...params }
                        const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} }

                        const View = views[each.component]
                        // 重新包装组件
                        const wrapperView = (
                            <DocumentTitle title={title}>
                                <View {...merge} />
                            </DocumentTitle>
                        )
                        return this.requireLogin(wrapperView, each.auth)
                    } }
                />
            ) : this.generateRoute(each.routes, title)
        ), routes)
    }

    render () {
        return (
            <Switch>

                <Route path="/front/autherror" component={ AuthError } />

                {
                    flatten(routesConf.map(each => {
                        const routes = each.routes || []
                        return this.generateRoute(routes, each.title)
                    }))
                }

                <Route render={ () => <Redirect to="/front/404" /> } />
            </Switch>
        )
    }
}

const mapStateToProps = (state, owns) => ({
    user: prop('userInfo', state),
    ...owns
})

export default connect(
    mapStateToProps
)(CRouter)