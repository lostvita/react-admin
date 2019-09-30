import React, { Component, Fragment } from 'react'
import { map, reduce, compose, prop, flatten } from 'ramda'
import { randomId } from 'js/utils'

class CommonTable extends Component {
    static TABLE_KEY = ['left-thead', 'thead', 'right-thead', 'left-tbody', 'tbody', 'right-tbody']

    constructor (props) {
        super(props)
        const theadReg = /thead$/i
        this.childrens = reduce((acc, each) => {
            const key = each['key']
            if(theadReg.test(key)) {
                acc[key] = each
            } else {
                const data = {
                    id: randomId(7),
                    node: each
                }
                acc[key] ? acc[key].push(data) : (acc[key] = [data])
            }
            return acc
        }, {}, CommonTable.extractTable(props))
        this.state = {
            hasLeft: !!this.childrens['left-thead'],
            hasRight: !!this.childrens['right-thead'],
        }
    }

    static extractTable (props) {
        if(!props) return []
        return compose(flatten, map(each => {
            if(this.TABLE_KEY.includes(each['key'])) return each
            return this.extractTable(each.props)
        }), flatten, prop('children'))(props)
    }

    render () {
        return (
            <div className="table-container">
                { this.state.hasLeft ? <div><table className="common-table table-left">
                    <thead>{ this.childrens['left-thead'] }</thead>
                    <tbody>{ map(each => <Fragment key={ each.id }>{ each.node }</Fragment>, this.childrens['left-tbody']) }</tbody>
                </table></div> : null }
                <table className="common-table table-middle">
                    <thead>{ this.childrens['thead'] }</thead>
                    <tbody>{ map(each => <Fragment key={ each.id }>{ each.node }</Fragment>, this.childrens['tbody']) }</tbody>
                </table>
                { this.state.hasRight ? <div><table className="common-table table-right">
                    <thead>{ this.childrens['right-thead'] }</thead>
                    <tbody>{ map(each => <Fragment key={ each.id }>{ each.node }</Fragment>, this.childrens['right-tbody']) }</tbody>
                </table></div> : null }
            </div>
        )
    }
}

export default CommonTable