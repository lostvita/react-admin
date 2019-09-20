import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Login extends Component {
    constructor (props) {
        super(props)

        this.login = this.login.bind(this)
    }

    render () {
        return (
            <section className="login">
                <div className="login-form">
                    <h2 className="login-title">Admin</h2>
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
            permission: ['add', 'delete'],
            isAdmin: false
        }
        dispatchLogin(user)

        // login success
        history.push('/front/home')
    }
}

export default withRouter(Login)