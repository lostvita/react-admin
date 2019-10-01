import React, { Component } from 'react'
import emitter from 'EventBus'

class CommonInput extends Component {
    constructor (props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
    }
    render () {
        return (
            <input type="text" placeholder={ this.props.placeholder } name={ this.props.model } className="common-input" onChange={ this.handleInput } />
        )
    }
    handleInput (evt) {
        const target = evt.target
        const { name, value } = target
        emitter.emit(name, value)
    }
}

export default CommonInput