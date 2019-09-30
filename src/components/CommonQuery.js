import React, { Component } from 'react'

class CommonQuery extends Component {
    render () {
        return (
            <div className="common-query">
                <div className="query-group">{ this.props.children }</div>
                <div className="query-control">
                    <button className="common-btn primary">确定</button>
                    <button className="common-btn secondary">清空</button>
                </div>
            </div>
        )
    }
}

export default CommonQuery