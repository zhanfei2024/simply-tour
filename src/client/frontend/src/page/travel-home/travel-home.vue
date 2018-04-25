<template>
  <div class="travel-home">
    <div class="travel-home-bg">
      <img src="../../assets/images/travel_home_bg.png" class="img-responsive"/>
    </div>
    <div class="">
      <div class="container">
        <div class="travel-home-profile-content ">
          <img v-lazy="lists.logo" class="img-responsive travel-logo">
          <div class="travel-home-profile">
            <h2>{{lists.title}}</h2>
            <p class="travel-reputation">
              <span class="reputation">实名认证</span>
              <span class="reputation">游客保障</span>
              <span class="collection">收藏商家</span>

            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="travel-home-menu">
          <Row>
            <i-col span="12" offset="6">
              <Menu mode="horizontal" theme="light" active-name="1">
                <MenuItem name="1" class="hvr-underline-from-center"
                          :class="{ 'hvr-underline-from-center-active': $route.path === `/travel/${$route.params.id}/home` }">
                  <router-link :to="{path: `/travel/${$route.params.id}/home`}">首页</router-link>
                </MenuItem>
                <MenuItem name="2" class="hvr-underline-from-center"
                          :class="{ 'hvr-underline-from-center-active': $route.path === '/travel/${$route.params.id}/domestic' }">
                  <router-link :to="{path: `/travel/${$route.params.id}/domestic`}">国内游</router-link>
                </MenuItem>
                <MenuItem name="3" class="hvr-underline-from-center"
                          :class="{ 'hvr-underline-from-center-active': $route.path === '/travel/${$route.params.id}/abroad' }">
                  <router-link :to="{path: `/travel/${$route.params.id}/abroad`}">境外游</router-link>
                </MenuItem>
                <MenuItem name="4" class="hvr-underline-from-center"
                          :class="{ 'hvr-underline-from-center-active': $route.path === '/travel/${$route.params.id}/introduction' }">
                  <router-link :to="{path: `/travel/${$route.params.id}/introduction`}">企业简介</router-link>
                </MenuItem>
                <MenuItem name="5" class="hvr-underline-from-center"
                          :class="{ 'hvr-underline-from-center-active': $route.path === '/travel/${$route.params.id}/contact' }">
                  <router-link :to="{path: `/travel/${$route.params.id}/contact`}">联系我们</router-link>
                </MenuItem>
              </Menu>
            </i-col>
          </Row>
        </div>
      </div>

      <i-col span="24">
        <!--首页-->
        <div v-if="$route.params.name === 'home'">
          <div class="container">
            <Row>
              <!--轮播图-->
              <i-col span="24">
                <Carousel
                  :autoplay="setting.autoplay"
                  :autoplay-speed="setting.autoplaySpeed"
                  :dots="setting.dots"
                  :trigger="setting.trigger"
                  :arrow="setting.arrow">
                  <div v-if="slideShow.length !== 0" v-for="item of slideShow">
                    <Carousel-item >
                      <img v-lazy="item.picture" style="height:470px;width: 100%" alt="banner_01">
                    </Carousel-item>
                  </div>
                  <div v-if="slideShow.length === 0">
                    <Carousel-item >
                      <img v-lazy="" style="height:470px;width: 100%" alt="banner_01">
                    </Carousel-item>
                  </div>
                </Carousel>
              </i-col>
            </Row>
          </div>
          <!--国内游-->
          <div class="home-domestic-bg">
            <img src="./../../assets/images/domestic_bg.png" class="img-responsive"/>
            <div class="home-position travel-home-md" style="right: 50%;top: 65%;">
              <h2 class="home-title text-center">国内游</h2>
            </div>
          </div>
          <div class="container travel-home-product">
            <Row :gutter="10">
              <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
              <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

              </i-col-product>
            </Row>
            <div class="text-center home-more-content" v-if="lists.length  > 0">
              <router-link class="ivu-btn-primary home-more" to="/domestic">查看更多</router-link>
            </div>
          </div>

          <!--境外游-->
          <div class="home-domestic-bg">
            <img src="./../../assets/images/abroad_bg.png" class="img-responsive"/>
            <div class="home-position travel-home-md" style="right: 50%;top: 65%;">
              <h2 class="home-title text-center">境外游</h2>
            </div>
          </div>

          <div class="container travel-home-product">
            <Row :gutter="10">
              <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
              <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

              </i-col-product>
            </Row>
            <div class="text-center home-more-content" v-if="lists.length  > 0">
              <router-link class="ivu-btn-primary home-more" to="/domestic">查看更多</router-link>
            </div>
          </div>
        </div>
        <!--首页-->
        <div class="container">
          <Row>
            <!--国内游-->
            <i-col :lg="20" v-if="$route.params.name === 'domestic'">
              <div class="travel-home-left">
                <h2 class="home-title home-title-padding">国内游</h2>
                <Row :gutter="10">
                  <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
                  <i-col-product :spans="8" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

                  </i-col-product>
                </Row>
                <div class="page-content" v-if="lists.length  > 0">
                  <Page :total="100"></Page>
                </div>
              </div>
            </i-col>
            <!--国内游-->

            <!--境外游-->
            <i-col :lg="20" v-if="$route.params.name === 'abroad'">
              <div class="travel-home-left">
                <h2 class="home-title home-title-padding">境外游</h2>
                <Row :gutter="10">
                  <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
                  <i-col-product :spans="8" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

                  </i-col-product>
                </Row>
                <div class="page-content" v-if="lists.length  > 0">
                  <Page :total="100"></Page>
                </div>
              </div>
            </i-col>
            <!--境外游-->

            <!--企业简介-->
            <i-col :lg="20" v-if="$route.params.name === 'introduction'">
              <div class="travel-home-left">

                <h2 class="home-title">企业简介</h2>
                <div class="home-introduction" v-html="lists.description">
                </div>
              </div>
            </i-col>
            <!--企业简介-->

            <!--联系我们-->

            <i-col :lg="20" v-if="$route.params.name === 'contact'">
              <div class="travel-home-left">
                <h2 class="home-title">联系我们</h2>
                <div class="travel-concats">
                  <p>
                    <Icon type="ios-home-outline"></Icon>
                    {{lists.title}}
                  </p>

                  <p>
                    <Icon type="ios-person-outline"></Icon>
                    地址： {{lists.location.name}} {{lists.address}}
                  </p>

                  <p>
                    <Icon type="android-phone-portrait"></Icon>
                    联系人：唐勇
                  </p>

                  <p>
                    <Icon type="ios-location-outline"></Icon>
                    电话：{{lists.phone}}
                  </p>
                </div>
                <baidu-map ak="W9Lc4dmtE5IITRSCMIwXu4BnD1wXUjNb">
                  <bm-view class="bm-view"></bm-view>
                  <bm-local-search :keyword="keyword" :auto-viewport="true"
                                   :location="location"></bm-local-search>
                </baidu-map>
              </div>
            </i-col>
            <!--联系我们-->

            <!--热门线路推荐-->
            <i-col :md="4" v-if="$route.params.name !== 'home'">
              <div class="travel-home-right">
                <h2 class="product-recommend-title">热门线路推荐</h2>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

              </div>
            </i-col>
            <!--热门线路推荐-->
          </Row>
        </div>
      </i-col>


    </div>
  </div>
</template>

<script>
  import IColProduct from "./../../components/i-col-product/i-col-product"
  import NoData from "./../../components/no-data/no-data"
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
  import BmView from 'vue-baidu-map/components/Map/MapView.vue'
  import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'

  export default {
    components: {IColProduct, BaiduMap, BmView, BmLocalSearch, NoData},
    name: "travel-home",
    data() {
      return {
        lists: [],
        slideShow: [],
        location: '',
        keyword: '',
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'inside',
          trigger: 'click',
          arrow: 'hover'
        }
      }
    },
    created() {
      this.get_data();
      this.get_slideShow();
    },
    methods: {
      get_data() {
        this.$Loading.start();
        this.$http.get(
          `public/travel/${this.$route.params.id}`,
        ).then(res => {
          this.lists = res.data.result;
          this.location =  this.lists.location.name;
          this.keyword =  this.lists.title;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
        })
      },
      get_slideShow() {
        this.$Loading.start();
        this.$http.get(
          `public/slide_show`,
          {params: {taId: this.$route.params.id}}
        ).then(res => {
          this.slideShow = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
        })
      }
    }
  }
</script>

<style scoped>
  .bm-view {
    width: 80%;
    height: 400px;
  }
</style>
