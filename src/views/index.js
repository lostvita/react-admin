import AsyncComponent from 'components/AsyncComponent'

const ApprovalUndo = AsyncComponent(() => import(/* webpackChunkName: "approvalundo" */ 'views/approval/undo'))
const ApprovalDone = AsyncComponent(() => import(/* webpackChunkName: "approvaldone" */ 'views/approval/done'))

export default {
    ApprovalUndo, ApprovalDone
}