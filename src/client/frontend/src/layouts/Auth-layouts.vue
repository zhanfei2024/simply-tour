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
                <header class="site-header" :class="{'fixeddiv': isFixed}">
                    <div class="headerinnerwrap" >
                        <router-link to="/" class="home-link">
                               <span>
                                   <img src="../assets/images/logo.png" alt="logo">
                               </span>
                        </router-link>
                      <span class="head-text" style="margin:30px 20px 0 40px;display: inline-block">400-0880-080</span>
                      <span class="head-text" style="margin-top: 30px;display: inline-block">周一至周日 08:00-18:00</span>
                      <div class="pull-right">
                           <span class="order-link">
                             <router-link style="margin-top: 30px" class="hvr-underline-from-left" to="/">返回網站首頁</router-link>
                           </span>
                        </div>
                    </div>
                </header>
            </div>

            <main style="min-height: 700px">
                <div class="container">
                    <bread-crumb></bread-crumb>
                </div>
                <router-view></router-view>
            </main>
          <div class="travel-footer text-center">
            <div class="container border">
              <p class="router" style="margin: 0 0 20px 0">
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
        components:{
            breadCrumb
        },
        data() {
            return {
                show: false,
                loading: false,
                isCollapsed: true,
                isFixed: false,
                theme2: 'light'
            }
        }
    }
</script>
