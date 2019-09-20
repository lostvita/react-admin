export default [
    {
        title: '广告主管理', // 页面标题&一级nav标题
        icon: 'icon-home',
        routes: [{
            name: '广告主列表',
            path: '/front/home',
            auth: 'add',
            component: 'Home'
        }, {
            name: 'ERP客户列表',
            path: '/front/client/about',
            component: 'About'
        }]
    },
    {
        title: '收入管理',
        icon: 'icon-flag',
        routes: [{
            name: '输入列表',
            auth: 'update',
            routes: [{
                name: '坏账列表',
                path: '/front/supplier/list',
                auth: '',
                component: 'Home'
            }, {
                name: '收款列表',
                path: '/front/supplier/detail',
                auth: '',
                component: 'Home'
            }]
        }, {
            name: '对账列表',
            path: '/front/supplier/about',
            component: 'About'
        }]
    }
]