<template>
  <div class="layout">
    <Layout>
      <!--手机头部-->
      <div id="wprmenu_bar" :class="{'menu_is_opened' : show, 'wprmenu_bar': !show}" class="wprmenu_bar"
           @click="show = !show">
        <div class="wprmenu-inner">
          <div class="wprmenu_icon">
            <span class="wprmenu_ic_1"></span>
            <span class="wprmenu_ic_2"></span>
            <span class="wprmenu_ic_3"></span>
          </div>
          <div class="menu_title">
            MENU
          </div>
        </div>
      </div>
      <div :class="{'left' : !show, 'right': show}" id="wprmenu_menu"
           class="wprmenu_levels slideLeft left wprmenu_custom_icons sidr">
        <ul id="wprmenu_menu_ul">
          <Collapse active-key="1" accordion>
            <Panel key="1">
              史蒂夫·乔布斯
              <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
            </Panel>
            <Panel key="2">
              斯蒂夫·盖瑞·沃兹尼亚克
              <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel key="3">
              乔纳森·伊夫
              <p slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
          </Collapse>
        </ul>
      </div>


      <!--pc网页头部-->
      <div class="layouts-head" style="padding: 14px 0">
        <div class="container clearfix">
          <div class="pull-left layouts-head-left">
            <router-link to="/" style="padding-left: 0">網站首頁</router-link>
            |
            <router-link to="/travel-list">旅行社</router-link>
            |
            <router-link to="/domestic">國內游</router-link>
            |
            <router-link to="/abroad">國外遊</router-link>
          </div>
          <!--//未登錄狀態-->
          <div class="layouts-head-right pull-right" v-if="!isUserLogin && !isTarvelLogin">
            <router-link to="/auth/login/travel">旅行社管理</router-link>
            |
            <router-link to="/auth/register/travel">旅行社注册</router-link>
            |
            <router-link to="/auth/login/user">请先登录</router-link>
            |
            <router-link to="/auth/register/user">免费注册</router-link>
          </div>
          <!--//用戶登錄后狀態-->
          <div style="float: right" class="layouts-head-right" v-if="isUserLogin && !isTarvelLogin">
            <Dropdown>
              <a href="javascript:void(0)">
                {{phone}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <router-link to="/user/center">會員中心</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link to="/user/collection/line">我的收藏</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link to="/user/security-list">安全設置</router-link>
                </DropdownItem>
                <DropdownItem>
                  <a @click="out()">退出登錄</a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <router-link to="/user/order-list">我的订单</router-link>
            <router-link to="/user/collection/line">我的收藏</router-link>
            <router-link to="/user/center">會員中心</router-link>
          </div>
          <!--旅行社登錄后狀態-->
          <div style="float: right" class="layouts-head-right" v-if="!isUserLogin && isTarvelLogin">
            <Dropdown>
              <a href="javascript:void(0)">
                {{phone}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <router-link to="/management/center">管理中心</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link to="/management/order-list">我的訂單</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link to="/management/security-list">安全設置</router-link>
                </DropdownItem>
                <DropdownItem>
                  <a @click="out()">退出登錄</a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <router-link to="/management/order-list">我的訂單</router-link>
            <router-link to="/management/profile">基本信息</router-link>
            <router-link to="/management/center">管理中心</router-link>
          </div>
        </div>
      </div>

      <main style="min-height: 700px">
        <router-view></router-view>
      </main>
      <div class="travel-footer text-center">
        <div class="container border">
          <p class="title">免责声明</p>
          <p class="text">本站所展示的信息由旅行社自行提供，内容的真实性、准确性和合法性由发布旅行社负责。</p>
          <p class="text">本网站对此不承担任何责任。如您发现本网店涉及虚假违规，请立即向我们举报!</p>
          <p class="router">
            <router-link to="/">关于我们</router-link>
            <router-link to="/">联系我们</router-link>
            <router-link to="/">用户协议</router-link>
          </p>
          <p class="copyRight">CopyRight @ xxx旅游网 2017 - 2018</p>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
  import breadCrumb from '../components/breadcrumb/breadcrumb.vue'

  export default {
    components: {
      breadCrumb
    },
    data() {
      return {
        show: false,
        loading: false,
        isCollapsed: true,
        isFixed: false,
        isUserLogin: false,
        isTarvelLogin: false,
        theme2: 'light',
        phone: ''
      }
    },
    created() {
      if (sessionStorage.getItem('access_token') && sessionStorage.getItem('role') === 'user') {
        this.isUserLogin = true;
      }
      if (sessionStorage.getItem('access_token') && sessionStorage.getItem('role') === 'travel') {
        this.isTarvelLogin = true;
      }
      this.phone = sessionStorage.getItem('phone');
    },
    methods: {
      out() {
        sessionStorage.clear();
        this.isUserLogin = false;
        this.isTarvelLogin = false;
        this.$router.push('/');
        this.$Message.success('退出成功');
      }
    }
  }
</script>
