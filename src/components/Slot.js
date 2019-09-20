/**
 * 插槽组件
 */

import { Component } from 'react'

class Slot extends Component {
    render () {
        return this.props.children
    }
}

export default Slot
