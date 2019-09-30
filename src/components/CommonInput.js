import React, { Component } from 'react'

class CommonInput extends Component {
    render () {
        return (
            <input type="text" placeholder={ this.props.placeholder } className="common-input" />
        )
    }
}

export default CommonInput