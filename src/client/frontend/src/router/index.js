import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //首页页面主视图
    {
      path: '/',
      // meta: {
      //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: r => require.ensure([], () => r(require('../layouts/Layouts')), 'Layouts'),//首页页面主视图
      children: [
        {
          path: '/',
          component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home') //路由懒加载
        },
        {
          path: 'travel-list',
          name: '旅行社',
          component: r => require.ensure([], () => r(require('../page/travel-list/travel-list')), 'travelList')
        },
        {
          path: 'domestic',
          name: '國內游',
          component: r => require.ensure([], () => r(require('../page/domestic/domestic')), 'domestic')
        },
        {
          path: 'search',
          name: '搜索结果',
          component: r => require.ensure([], () => r(require('../page/domestic/domestic')), 'domestic')
        },
        {
          path: 'abroad',
          name: '國外游',
          component: r => require.ensure([], () => r(require('../page/abroad/abroad')), 'abroad')
        },
        {
          path: 'corp/:name',
          name: '關於我們',
          component: r => require.ensure([], () => r(require('../page/about-us/about-us')), 'aboutUs')
        },
        {
          path: 'product/:productId/order',
          name: '商品訂單',
          component: r => require.ensure([], () => r(require('../page/product-order/product-order')), 'productOrder')
        },
        // 用户中心
        {
          path: 'user',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: r => require.ensure([], () => r(require('../page/user/user.layouts')), 'userLayouts'),
          children: [
            {
              path: 'center',
              name: '用戶中心',
              component: r => require.ensure([], () => r(require('../page/user/center/center')), 'userCenter'),
            },
            {
              path: 'profile',
              name: '用戶信息',
              component: r => require.ensure([], () => r(require('../page/user/profile/profile')), 'userProfile'),
            },
            {
              path: 'security-list',
              name: '安全管理',
              component: r => require.ensure([], () => r(require('../page/user/security/security-list')), 'userSecurity'),
            },
            {
              path: 'security-post',
              name: '安全',
              component: r => require.ensure([], () => r(require('../page/user/security/security-post')), 'userSecurity'),
            },
            {
              path: 'order-list',
              name: '我的訂單',
              component: r => require.ensure([], () => r(require('../page/user/order/order-list')), 'userOrderList'),
            },
            {
              path: 'order/:id/details',
              name: '訂單詳情',
              component: r => require.ensure([], () => r(require('../page/user/order/order-details')), 'userOrderDetails'),
            },
            {
              path: 'evaluate-list',
              name: '訂單評價',
              component: r => require.ensure([], () => r(require('../page/user/evaluate/evaluate-list')), 'userEvaluate'),
            },
            {
              path: 'collection/line',
              name: '收藏線路',
              component: r => require.ensure([], () => r(require('../page/user/collection/collection-line')), 'userCollectionLine'),
            },
            {
              path: 'collection/travel',
              name: '收藏的旅行社',
              component: r => require.ensure([], () => r(require('../page/user/collection/collection-traevl')), 'userCollectionLine'),
            },
            {
              path: 'evaluate/:productId/post',
              // meta: {
              //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              // },
              name: '發表評價',
              component: r => require.ensure([], () => r(require('../page/user/evaluate/evaluate-post')), 'userEvaluatePost'),
            },
          ],

        },
        //管理中心
        {
          path: 'management',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: r => require.ensure([], () => r(require('../page/management/management.layouts')), 'management'),
          children: [
            {
              path: 'center',
              name: '管理中心',
              component: r => require.ensure([], () => r(require('../page/management/center/center')), 'center'),
            },
            {
              path: 'profile',
              name: '我的信息',
              component: r => require.ensure([], () => r(require('../page/management/profile/profile')), 'profile'),
            },
            {
              path: 'security-list',
              name: '安全列表',
              component: r => require.ensure([], () => r(require('../page/management/security/security-list')), 'security'),
            },
            {
              path: 'security-post',
              name: '安全發佈',
              component: r => require.ensure([], () => r(require('../page/management/security/security-post')), 'securityPost'),
            },
            {
              path: 'order-list',
              name: '訂單管理',
              component: r => require.ensure([], () => r(require('../page/management/order/order-list')), 'orderList'),
            }, {
              path: 'order/:id/details',
              name: '訂單提交',
              component: r => require.ensure([], () => r(require('../page/management/order/order-details')), 'orderDetails'),
            },
            {
              path: 'evaluate-list',
              name: '待評價訂單',
              component: r => require.ensure([], () => r(require('../page/management/evaluate/evaluate-list')), 'evaluate'),
            },
            {
              path: 'line-list',
              name: '線路管理',
              component: r => require.ensure([], () => r(require('../page/management/line/line-list')), 'line'),
            },
            {
              path: 'line-post',
              name: '線路發佈',
              component: r => require.ensure([], () => r(require('../page/management/line/line-post')), 'linePost'),
            },
            {
              path: 'carousel',
              name: '輪播管理',
              component: r => require.ensure([], () => r(require('../page/management/carousel/carousel')), 'Carousel'),
            },
            {
              path: 'carousel-post',
              name: '添加轮播图',
              component: r => require.ensure([], () => r(require('../page/management/carousel/carousel-form')), 'Carousel-form'),
            }
          ]
        }
      ],

    },
    //旅行社页面主视图
    {
      path: '/travel/:id',
      component: r => require.ensure([], () => r(require('../layouts/Travel-layouts')), 'homeLayouts'),//旅行社页面主视图
      children: [
        {
          path: ':name',
          name: '我的旅行社',
          component: r => require.ensure([], () => r(require('../page/travel-home/travel-home')), 'travelHome')
        },
        {
          path: 'product/:type/:productId/details',
          name: '商品詳情',
          component: r => require.ensure([], () => r(require('../page/travel-product/travel-product')), 'travelProduct')
        }
      ]
    },
    //登录主视图
    {
      path: '/auth',
      component: r => require.ensure([], () => r(require('../layouts/Auth-layouts')), 'AuthLayouts'), //登录主视图
      children: [
        {
          path: 'login/:name',
          name: '賬號登錄',
          component: r => require.ensure([], () => r(require('../page/auth/login/login')), 'Logsin')
        },
        {
          path: 'register/:name',
          name: '賬號註冊',
          component: r => require.ensure([], () => r(require('../page/auth/register/register')), 'Register')
        },
        {
          path: 'forget-password/:name',
          name: '忘記密碼',
          component: r => require.ensure([], () => r(require('../page/auth/forget-password/forget-password')), 'password')
        },
        {
          path: 'settled',
          name: '旅行社入駐',
          component: r => require.ensure([], () => r(require('../page/travel-settled/travel-settled-post')), 'settled')
        },
        {
          path: 'settled/:name',
          name: '審核',
          component: r => require.ensure([], () => r(require('../page/travel-settled/travel-settled-staus')), 'status')
        }
      ]
    }

  ]
})
