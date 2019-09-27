import React, {Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { pipe, map, flatten, prop, path} from 'ramda'

import routesConf from './config'
import views from 'views'

class CRouter extends Component {
    render () {
        return (
            <Switch>
                { pipe(map(each => {
                    const routes = each.routes
                    return this.generateRoute(routes, each.title)
                }), flatten)(routesConf) }
                <Route render={ () => <Redirect to="/front/404" /> } />
            </Switch>
        )
    }

    generateRoute (routes=[], title='统一待办中心') {
        return map(each => each.component ? (
            <Route 
                key={ each.path }
                exact  // 精确匹配路由
                path={ each.path }
                render={ props => {
                    const reg = /\?\S*g/
                    const queryParams = window.location.hash.match(reg)  // 匹配路由参数
                    const { params } = props.match
                    Object.keys(params).forEach(key => { // 去除?参数
                        params[key] = params[key] && params[key].replace(reg, '')
                    })
                    props.match.params = { ...params }
                    const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} }
                    const View = views[each.component]
                    const wrapperView = ( // 包装组件设置标签页标题
                        <DocumentTitle title={ title }>
                            <View { ...merge } />
                        </DocumentTitle>
                    )
                    return this.requireLogin(wrapperView, each.auth)
                } }
            />
        ) : this.generateRoute(each.routes, title), routes)
    }

    requireLogin (component, permission) {
        const { user } = this.props
        const isLogin = user.username || false  // 登录标识, 从redux取
        if(!isLogin) { // 判断是否登录
            return <Redirect to={'/front/login'} />
        }
        return permission ? this.requirePermission(component, permission) : component
    }

    requirePermission (component, permission) {
        const permissions = path(['user', 'permission'], this.props) // 用户权限, 从redux取
        if(!permissions || !this.checkPermission(permission, permissions)) return <Redirect to="/front/autherror" />
        return component
    }

    checkPermission (requirePers, userPers) {
        const isAdmin = path(['user', 'isAdmin'], this.props) // // 超管标识, 从redux取
        if(isAdmin) return true
        if(typeof userPers === 'undefined') return false
        if(Array.isArray(requirePers)) { // 路由权限为数组
            return requirePers.every(each => userPers.includes(each))
        } else if(requirePers instanceof RegExp) { // 路由权限设置为正则
            return userPers.some(each => requirePers.test(each))
        }
        return userPers.includes(requirePers)  // 路由设置为字符串
    }
}

const mapStateToProps = (state, owns) => ({
    user: prop('user', state),
    ...owns
})

export default connect(
    mapStateToProps
)(CRouter)