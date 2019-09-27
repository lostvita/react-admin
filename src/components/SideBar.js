/**
 * 侧栏导航组件，侧栏按钮在router/config.js配置
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { map, prop, compose, filter, keys, join, path } from 'ramda'

import { updateSidebarState } from 'store/action'
import Slot from 'components/Slot'

class SideBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            routeName: path(['locaotion', 'pathname'], this.props),
            routes: compose(this.checkActive.bind(this), prop('sidebar'))(this.props)
        }
        this.generateSidebar = this.generateSidebar.bind(this)
        this.className = this.className.bind(this)
    }

    render () {
        return (
            <ul className="sidebar-wrapper">
                { map(this.generateSidebar, this.state.routes) }
            </ul>
        )
    }

    generateSidebar (item) {
        return this.hasPer(item.auth) ? <li className="sidebar-item" key={item.title}>
            <div className={ this.className({
                'sidebar-item-name': true,
                'on': item.active
            }) } onClick={ this.toggleMenu.bind(this, item.key) }>
                <span>
                    { item.title }
                </span>
            </div>
            <ul className="sidebar-sub">
                { this.generateSubMenu(item.routes) }
            </ul>
        </li> : null
    }

    generateSubMenu (routes) {
        return map(each => this.hasPer(each.auth) ? <li className="sidebar-sub-item" key={ each.name }>
            { each.component ? <NavLink to={ each.path } activeClassName="active">{ each.name }</NavLink> : (
                <Slot>
                    <div className={ this.className({
                        'sidebar-item-name': true,
                        'on': each.active
                    }) }>
                        { each.name }
                    </div>
                    <ul className="sidebar-sub">
                        { this.generateSubMenu(each.routes) }
                    </ul>
                </Slot>
            ) }
        </li> : null, routes)
    }

    className (data) {
        const filterFn = key => !!prop(key, data)
        return compose(join(' '), filter(filterFn), keys)(data)
    }

    toggleMenu (key) {
        const { dispatchSideBar } = this.props
        dispatchSideBar(key)
        this.setState({
            routes: prop('sidebar', this.props)
        })
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

    hasPer (per) {
        const isAdmin = path(['user', 'isAdmin'], this.props)
        if(isAdmin || !per) return true
        const permissions = path(['user', 'permission'], this.props)
        if(typeof permissions === 'undefined') return false
        if(Array.isArray(per)) {
            return per.every(each => permissions.includes(each))
        } else if(per instanceof RegExp) {
            return permissions.some(each => per.test(each))
        }
        return permissions.includes(per)
    }
}

const mapStateToProps = (state, owns) => ({
    user: prop('user', state),
    sidebar: prop('sidebarInfo', state),
    ...owns
})

const mapDispatchToProps = dispatch => ({
    dispatchSideBar: sidebar => dispatch(updateSidebarState(sidebar))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SideBar))