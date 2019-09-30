import React, { Component } from 'react'

import Pagination from 'components/Pagination'
import CommonQuery from 'components/CommonQuery'
import CommonInput from 'components/CommonInput'

class ApprovalDone extends Component {
    render () {
        return (
            <div className="view">
                <div className="view-head">
                    <div className="view-title">已处理</div>
                    <ul className="view-tap">
                        <li className="view-tap-item active">全部</li>
                        <li className="view-tap-item">财务类</li>
                        <li className="view-tap-item">业务类</li>
                        <li className="view-tap-item">行政类</li>
                    </ul>
                </div>
                <div className="view-body">
                    <CommonQuery >
                        <CommonInput />
                    </CommonQuery>
                </div>
                <div className="view-foot">
                    <Pagination />
                </div>
            </div>
        )
    }
}

export default ApprovalDone