import React, { Component } from 'react'
import PropTypes from 'prop-types'
import emitter from 'EventBus'

class CommonInput extends Component {
    constructor (props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
    }
    render () {
        return (
            <input type={ this.props.type } placeholder={ this.props.placeholder } name={ this.props.model } className="common-input" onChange={ this.handleInput } />
        )
    }
    handleInput (evt) {
        const target = evt.target
        const { name, value } = target
        emitter.emit(name, value)
    }
}

CommonInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number']),
    model: PropTypes.string.isRequired
}

CommonInput.defaultProps = {
    type: 'text'
}

export default CommonInput