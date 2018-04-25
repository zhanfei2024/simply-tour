import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
//引入全局Scss样式
import './assets/style/style.scss'
import axios from 'axios'
import VueI18n from 'vue-i18n'

//引入 vue UI框架
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store'
import lodash from 'lodash'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'babel-polyfill'; // es6 shim


Vue.use(VueQuillEditor, /* { default global options } */)

Vue.prototype.$lodash = lodash

Vue.use(Vuex)


//图片懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://dummyimage.com/400/EE5C42/ffffff',
    loading: 'https://dummyimage.com/400/CAE1FF/ffffff',
    attempt: 1,
    listenEvents: ['scroll']
});

Vue.use(iview)


// 配置API接口地址 将API方法绑定到全局
axios.defaults.baseURL = 'http://127.0.0.1:4000/api/v1';

// http request 拦截器
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use((config) => { //配置发送请求的信息
    if (sessionStorage.getItem('access_token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
    }
    return config;
}, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                sessionStorage.clear();
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error);
});
Vue.prototype.$http = axios;


//设置i18n
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'HK',
    messages: {
        'EN': require('./assets/lang/en'),
        'CN': require('./assets/lang/cn'),
        'HK': require('./assets/lang/hk')
    }
})

// 判断该路由是否需要登录权限
router.beforeEach((to, from, next) => {
    iview.LoadingBar.start();
    if (to.meta.requireAuth) {
        if (sessionStorage.getItem('access_token')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
router.afterEach(route => {
    iview.LoadingBar.finish();
    window.scrollTo(0, 0);
});

//设置全局vue
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
})
