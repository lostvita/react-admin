export default [
    {
        title: '我的事务', // 页面标题&一级nav标题
        icon: 'icon-home',
        routes: [{
            name: '待审批',
            path: '/front/approval/undo',
            component: 'ApprovalUndo'
        }, {
            name: '已处理',
            path: '/front/approval/done',
            auth: 'add',
            component: 'ApprovalDone'
        }]
    }
]