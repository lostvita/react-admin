import React, { Component } from 'react'

class AlignCell extends Component {
    render () {
        return (
            <td className="align-cell">
                <div className="table-cell">{ this.props.children }</div>
            </td>
        )
    }
}

export default AlignCell