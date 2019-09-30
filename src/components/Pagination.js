import React, { Component } from 'react'

class Pagination extends Component {
    constructor () {
        super()
        this.handleInput = this.handleInput.bind(this)
    }
    
    render () {
        return (
            <ul className="pagination">
                <p className="pagination-total">共100条</p>
                <li className="pagination-item">1</li>
                <li className="pagination-item">2</li>
                <li className="pagination-item">...</li>
                <li className="pagination-item">7</li>
                <p className="pagination-goto">跳至<input type="text" onChange={ this.handleInput } className="common-input pagination-input" />页</p>
            </ul>
        )
    }

    handleInput (evt) {
        const target = evt.target
        console.log(target.value)
    }
}

export default Pagination