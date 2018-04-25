import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};



export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的动态子页面展示但是不在左侧菜单显示的路由写在otherRouter里，用于展示动态路由
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/index/home',
    component: Main,
    children: [
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') },
        {
            path: '/line-detail/:id',
            name: 'LineDetail',
            title: '线路详情',
            meta: false,
            component: () => import('@/views/travel/line-detail/line-detail.vue')
        },
        {
            path: '/travel-detail/:id',
            name: 'TravelDetail',
            title: '旅行社详情',
            meta: false,
            component: () => import('@/views/travel/travel-detail/travel-detail.vue')
        },
        {
            path: 'order-detail/:id',
            name: 'OrderDetail',
            title: '订单详情',
            meta: false,
            component: () => import('@/views/order/order-detail/order-detail.vue')
        },
        {
            path: 'member-detail/:id',
            name: 'MemberDetail',
            title: '会员详情',
            meta: false,
            component: () => import('@/views/member/member-detail/member-detail.vue')
        },
        {
            path: 'edit-carouse/:id',
            name: 'EditCarouse',
            title: '编辑轮播图',
            meta: false,
            component: () => import('@/views/set/edit-carouse/edit-carouse.vue')
        },
        {
            path: 'add-carouse/:id',
            name: 'AddCarouse',
            title: '添加轮播图',
            meta: false,
            component: () => import('@/views/set/add-carouse/add-carouse.vue')
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/index',
        name: 'index',
        icon: 'ios-home',
        title: '首页',
        component: Main,
        children: [
            {
                path: 'account', name: 'Account', title: '账户设置', component: () => import('@/views/index/account/account.vue')
            },
            {
                path: 'home', name: 'Home', title: '系统首页', component: () => import('@/views/index/home/home.vue')
            },
        ]
    },
    {
        path: '/travel',
        name: 'travel',
        icon: 'ios-keypad',
        title: '旅行社',
        component: Main,
        children: [
            {
                path: 'enter-manage',
                name: 'EnterManage',
                title: '入驻审核',
                component: () => import('@/views/travel/enter-manage/enter-manage.vue')
            },
            {
                path: 'travel-manage',
                name: 'TravelManage',
                title: '旅行社管理',
                component: () => import('@/views/travel/travel-manage/travel-manage.vue')
            },
            {
                path: 'line-manage',
                name: 'LineManage',
                title: '线路管理',
                component: () => import('@/views/travel/line-manage/line-manage.vue')
            },
            {
                path: 'carouse-manage',
                name: 'CarouseManage',
                title: '轮播图管理',
                component: () => import('@/views/travel/carouse-manage/carouse-manage.vue')
            },
        ]
    },
    {
        path: '/order',
        name: 'order',
        icon: 'ios-pricetag',
        title: '订单',
        component: Main,
        children: [

            {
                path: 'order-manage',
                name: 'OrderManage',
                title: '订单管理',
                component: () => import('@/views/order/order-manage/order-manage.vue')
            },
        ]
    },
    {
        path: '/member',
        name: 'member',
        icon: 'person-stalker',
        title: '会员',
        component: Main,
        children: [
            {
                path: 'member-list',
                name: 'MemberList',
                title: '会员管理',
                component: () => import('@/views/member/member-list/member-list.vue')
            },
        ]
    },

    {
        path: '/set',
        name: 'set',
        icon: 'ios-cog',
        title: '设置',
        component: Main,
        children: [
            {
                path: 'set-info',
                name: 'SetInfo',
                title: '平台设置',
                component: () => import('@/views/set/info/info.vue')
            },
            {
                path: 'carouse-list',
                name: 'CarouseList',
                title: '轮播图管理',
                component: () => import('@/views/set/carouse-list/carouse-list.vue')
            },
        ]
    },
   ];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404,
];
