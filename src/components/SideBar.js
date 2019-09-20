/**
 * 侧栏导航组件，侧栏按钮在router/config.js配置
 */

import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { map, prop, compose, filter, keys, join, path } from 'ramda'

import Slot from 'components/Slot'

import { updateSideBarState } from 'store/action'

class SideBar extends Component {
    constructor (props) {
        super(props)
        console.log(this.props)
        this.state = {
            routeName: path(['location', 'pathname'], this.props),
            routes: compose(this.checkActive.bind(this), prop('sidebar'))(this.props)
        }

        this.generateMenu = this.generateMenu.bind(this)
        this.className = this.className.bind(this)
    }

    hasPer (per) {
        const isAdmin = path(['userInfo', 'isAdmin'], this.props)
        if(isAdmin || !per) return true
        const permissions = path(['userInfo', 'permission'], this.props)
        const notUndefined = typeof permissions !== 'undefined'
        if(Array.isArray(per)) {
            return notUndefined && per.every(each => permissions.includes(each))
        } else if(per instanceof RegExp) {
            return notUndefined && permissions.some(each => per.test(each))
        }
        return notUndefined && permissions.includes(per)
    }

    generateMenu (item) {
        return (this.hasPer(item.auth) ?
            <li className="menu-item" key={item.title}>
                <div className={ this.className({
                    'menu-item-name': true,
                    'on': item.active
                }) } onClick={ this.toggleMenu.bind(this, item.key) }>
                    <span><i className={ this.className({
                            'icomoon nav-icon': true,
                            [item.icon]: !item.active,
                            [`${item.icon}-fill`]: item.active
                        }) }></i>
                        { item.title }
                    </span>
                    <i className={ this.className({
                        'icomoon': true,
                        'icon-right2': !item.active,
                        'icon-down2': item.active
                    }) }></i>
                </div>
                <ul className="menu-sub">
                    { this.generateSubMenu(item.routes) }
                </ul>
            </li> : null
        )
    }

    generateSubMenu (routes) {
        return map((each) => ( this.hasPer(each.auth) ? 
            <li className="menu-sub-item" key={each.name}>
                { each.component ? <NavLink to={each.path} activeClassName="active">{ each.name }</NavLink> : (
                    <Slot>
                        <div className={ this.className({
                                'menu-item-name': true,
                                'on': each.active
                             }) } onClick={ this.toggleMenu.bind(this, each.key) }
                        >
                            <i className={ this.className({
                                'icomoon': true,
                                'icon-right2': !each.active,
                                'icon-down2': each.active
                            }) }></i>
                            { each.name }
                        </div>
                        <ul className="menu-sub">
                            { this.generateSubMenu(each.routes) }
                        </ul>
                    </Slot>
                ) }
            </li> : null
        ), routes)
    }

    toggleMenu (key) {
        const { dispatchSideBar } = this.props
        dispatchSideBar(key)
        this.setState({
            routes: prop('sidebar', this.props)
        })
    }

    className (obj) {
        const filterFn = key => !!prop(key, obj)
        return compose(join(' '), filter(filterFn), keys)(obj)
    }

    checkActive (arr, routeName='') {
        const rName = routeName || path(['location', 'pathname'], this.props)
        return map((each) => {
            const reg = new RegExp(rName)
            if(reg.test(each.key)) {
                each.active = true
            } else if (each.routes) {
                each.routes = this.checkActive(each.routes, rName)
            }
            return each
        }, arr)
    }

    render () {
        return (
            <div className="menu-wrapper">
                <ul className="menu">
                    { map(this.generateMenu, this.state.routes) }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, owns) => ({
    userInfo: prop('userInfo', state),
    sidebar: prop('sideBarInfo', state),
    ...owns
})

const mapDispatchToProps = dispatch => ({
    dispatchSideBar: sidebar => dispatch(updateSideBarState(sidebar))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SideBar))

