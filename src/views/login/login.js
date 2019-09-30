import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { values, compose, all, path } from 'ramda'
import 'scss/login.scss'

import { setSessionStore, className } from 'js/utils'

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            form: {
                username: '',
                password: ''
            },
            canApply: false,
            btnClass: 'login-btn disabled'
        }

        this.handleInput = this.handleInput.bind(this)

        this.login = this.login.bind(this)
    }

    shouldComponentUpdate (nextProps, nextState) {
		if(this.state.canApply !== nextState.canApply) return true
		return false
	}

    render () {
        return (
            <section className="login">
                <div className="login-form">
                    <h2 className="login-title">统一待办中心</h2>
                    <input className="common-input" type="text" name="username" placeholder="帐号" onChange={ this.handleInput } />
                    <input className="common-input" type="password" name="password" placeholder="密码" onChange={ this.handleInput } />
                    <button className={ this.state.btnClass } disabled={ !this.state.canApply } onClick={ this.login }>登录</button>
                </div>
            </section>
        )
    }

    handleInput (evt) {
        const target = evt.target
        const { name, value } = target
        const anather = name === 'username' ? 'password' : 'username'
        const formData = {
            [name]: value,
            [anather]: path(['form', anather], this.state)
        }
        const validForm = val => !!val
        const valid = compose(all(validForm), values)(formData)
        this.setState({
            form: formData,
            canApply: valid,
            btnClass: className({
                'login-btn': true,
                'disabled': !valid
            })
        })
    }

    login () {
        const { dispatchLogin, history } = this.props
        const { form } = this.state
        const user = {
            username: form.username,
            lastname: form.username,
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