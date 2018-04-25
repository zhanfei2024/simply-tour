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
      <div class="headerwrap">
        <div class="layouts-head">
          <div class="container">
            <span class="head-text">欢迎您来到xx旅游网站</span>|<span class="head-text"
                                                             style="margin:0 20px 0 30px">400-0880-080</span>
            <span class="head-text">周一至周日 08:00-18:00</span>
            <!--//未登錄狀態-->
            <div style="float: right" class="layouts-head-right" v-if="!isUserLogin && !isTarvelLogin">
              <router-link to="/auth/login/merchant">旅行社管理</router-link>
              |
              <router-link to="/auth/register/merchant">旅行社注册</router-link>
              |
              <router-link to="/auth/login/customer">请先登录</router-link>
              |
              <router-link to="/auth/register/customer">免费注册</router-link>
            </div>
            <!--//用戶登錄后狀態-->
            <div class="layouts-head-right pull-right" v-if="isUserLogin && !isTarvelLogin">
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
            <!--旅行社登錄审核通过后狀態-->
            <div class="layouts-head-right pull-right" v-if="!isUserLogin && isTarvelLogin && status === 'success'">
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
            <div class="layouts-head-right pull-right" v-if="!isUserLogin && isTarvelLogin && status !== 'success'">
              <Dropdown>
                <a href="javascript:void(0)">
                  {{phone}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <router-link to="/auth/settled/examine">管理中心</router-link>
                  </DropdownItem>
                  <DropdownItem>
                    <a @click="out()">退出登錄</a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <router-link to="/auth/settled/examine">管理中心</router-link>
            </div>
          </div>
        </div>
        <header class="site-header" :class="{'fixeddiv': isFixed}">
          <div class="headerinnerwrap">
            <router-link to="/" class="home-link">
                            <span>
                                   <img src="../assets/images/logo.png" alt="logo">
                            </span>
            </router-link>
            <div class="navbar">
              <nav class="main-navigation">
                <div class="nav-container">
                  <ul class="nav-menu">
                    <Dropdown placement="bottom-start">
                      <li class="menu-item hvr-underline-from-center" :class="{ 'hvr-underline-from-center-active': $route.path === '/' }">
                        <router-link to="/">
                          首页
                          <span class="colorbar"></span>
                        </router-link>
                      </li>
                    </Dropdown>
                    <li class="menu-item hvr-underline-from-center" :class="{ 'hvr-underline-from-center-active': $route.path === '/travel-list' }">
                      <router-link to="/travel-list">
                        旅行社
                        <span class="colorbar"></span>
                      </router-link>
                    </li>
                    <li class="menu-item hvr-underline-from-center" :class="{ 'hvr-underline-from-center-active': $route.path === '/domestic' }">
                      <router-link to="/domestic">
                        国内游
                        <span class="colorbar"></span>
                      </router-link>
                    </li>
                    <li class="menu-item hvr-underline-from-center" :class="{ 'hvr-underline-from-center-active': $route.path === '/abroad' }">
                      <router-link to="/abroad">
                        境外游
                        <span class="colorbar"></span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="topsearch">
              <form role="search" method="get" class="search-form"  @keyup.enter="search()">
                <Input v-model="searchText" icon="ios-search-strong" placeholder="请输入线路关键词"></Input>
              </form>
            </div>

          </div>
        </header>
      </div>

      <main style="min-height: 800px">
        <div class="container">
          <bread-crumb></bread-crumb>
        </div>
        <router-view></router-view>
      </main>
      <Footer class="layout-footer-center">
        <div class="footer-bg">
        </div>
        <div class="footer-content container">
          <div class="footer-statement">
            <div class="statement">
              <img src="../assets/images/footer_icon2.png"/>
              <p>价格透明</p>
            </div>
            <div class="statement">
              <img src="../assets/images/footer_icon3.png"/>
              <p>服务至上</p>
            </div>
            <div class="statement">
              <img src="../assets/images/footer_icon4.png"/>
              <p>服务保障</p>
            </div>
          </div>
          <div class="footer-router">
            <router-link to="/travel-list">
              旅行社
            </router-link>
            <router-link to="/domestic">
              國內游
            </router-link>
            <router-link to="/abroad">
              國外游
            </router-link>
            <router-link to="/corp/contacts">
              聯繫我們
            </router-link>
            <router-link to="/corp/abouts">
              關於我們
            </router-link>
            <router-link to="/corp/protocol">
              用戶協議
            </router-link>
          </div>
          <div class="footer-contact">
            <p><span>400-0880-080</span> <span style="margin-left: 40px">周一至周日 08:00-18:00</span></p>
          </div>
          <p class="footer-text">CopyRight @ xxx旅游网 2017 - 2018</p>
        </div>
      </Footer>
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
        searchText: '',
        show: false,
        loading: false,
        isCollapsed: true,
        isFixed: false,
        isUserLogin: false,
        isTarvelLogin: false,
        theme2: 'light',
        phone: '',
        status: '',
      }
    },
    created() {
      if (sessionStorage.getItem('access_token') && sessionStorage.getItem('role') === 'customer') {
        this.isUserLogin = true;
      }
      if (sessionStorage.getItem('access_token') && sessionStorage.getItem('role') === 'merchant') {
        this.isTarvelLogin = true;
      }
      this.getTravel();
      this.status = sessionStorage.getItem('travelStatus');
      this.phone = sessionStorage.getItem('phone');
    },
    methods: {
      out() {
        sessionStorage.clear();
        this.isUserLogin = false;
        this.isTarvelLogin = false;
        this.$router.push('/');
        this.$Message.success('退出成功');
      },
      // 商家资料
      getTravel(){
        this.$http.get(`merchant/travel/self`).then(res => {
          this.travel = res.data.result;
          sessionStorage.setItem('travelStatus', this.travel.status);
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },

      search() {
        this.$router.push({name: '搜索结果', query: {search: this.searchText}});
      }
    }
  }
</script>
