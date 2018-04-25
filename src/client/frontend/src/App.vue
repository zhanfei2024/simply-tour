<template>
    <div id="app">
        <router-view></router-view>
        <Spin fix v-show="!loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'


    export default {
        name: 'app',
        data() {
            return {
                show: false,
                loading: true,
                isCollapsed: true,
                isFixed: false,
                theme2: 'light'
            }
        },
        beforeCreate(){
            axios.interceptors.request.use((config) => { //配置发送请求的信息
                this.loading = false;
                setTimeout(()=>{
                    this.loading = true;
                },1000)
                return config;
            }, (error) => {
                setTimeout(()=>{
                    this.loading = true;
                },1000)
                return Promise.reject(error);
            });
        },
        created() {
            window.onscroll = () => {
                //变量t是滚动条滚动时，距离顶部的距离
                let t = document.documentElement.scrollTop || document.body.scrollTop;
                //当滚动到距离顶部0px时，
                if (t === 0) {
                    this.isFixed = false;
                } else {
                    this.isFixed = true;
                }
            }
        },

        methods: {
            changLang(key) {
                switch (key) {
                    case 'HK':
                        this.$i18n.locale = 'HK'
                        break;
                    case 'EN':
                        this.$i18n.locale = 'EN'
                        break;
                    case 'CN':
                        this.$i18n.locale = 'CN'
                        break;
                }
            },

        }
    }
</script>
