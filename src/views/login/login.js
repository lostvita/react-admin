import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { setSessionStore } from 'js/utils'

class Login extends Component {
    constructor (props) {
        super(props)

        this.login = this.login.bind(this)
    }

    render () {
        return (
            <section className="login">
                <div className="login-form">
                    <h2 className="login-title">统一待办中心</h2>
                    <input className="common-input" type="text" placeholder="帐号" />
                    <input className="common-input" type="password" placeholder="密码" />
                    <button className="login-btn" onClick={ this.login }>登录</button>
                </div>
            </section>
        )
    }

    login () {
        const { dispatchLogin, history } = this.props
        const user = {
            username: 'ange@gmail.com',
            lastname: '安歌',
            img: 'avatar.png',
            permission: ['add'],
            isAdmin: false
        }
        dispatchLogin(user)
        setSessionStore('user', user)

        // login success
        history.push('/front/approval/undo')
    }  
}

export default withRouter(Login)