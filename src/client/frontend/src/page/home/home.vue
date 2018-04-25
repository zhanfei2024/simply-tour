<template>
  <!--网站广告-->
  <section>
    <div class="ibanner">
      <Carousel
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <Carousel-item>
          <img src="../../assets/images/banner2.png" class="img-responsive"/>
        </Carousel-item>
        <Carousel-item>
          <img src="../../assets/images/banner.png" class="img-responsive"/>
        </Carousel-item>

      </Carousel>
    </div>


    <!--平台精选-->
    <div class="container">
      <div class="home-selected">
        <div class="list-head">
          <span class="home-title margin-border">平台精选</span>
          <div class="menu">
            <div class="menu-list hvr-underline-from-center hvr-underline-from-center-active">
              <a href="">当季人气</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a class="hvr-underline-from-center" href="">人气产品</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a class="hvr-underline-from-center" href="">新品上线</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a class="hvr-underline-from-center" href="">热门推荐</a>
            </div>
          </div>
        </div>
        <Row>
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <i-col-product :spans="8" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0" >

          </i-col-product>
        </Row>
      </div>
    </div>
    <!--旅行社-->
    <section class="home-travel">
      <div class="home-travel-bg travel-bg-md">
        <img src="../../assets/images/travel_bg.png"/>
      </div>
      <div class="container home-travel-main text-center clearfix">
        <Row>
          <h2 class="text-center home-travel-title">旅行社</h2>


          <i-col-travel :spans="6" :spanMd="12" :spanSm="12" :data="travel">
          </i-col-travel>
          <div class="text-center" v-if="travel.length  > 0">
            <router-link class="ivu-btn-primary home-travel-more" to="/travel-list">全部旅行社</router-link>
          </div>
        </Row>
      </div>
    </section>

    <!--下划线-->
    <div class="container">
      <div class="home-order"></div>
    </div>

    <!--国内游-->
    <section class="home-domestic">
      <div class="home-domestic-bg">
        <img src="../../assets/images/domestic_bg.png" class="img-responsive"/>
        <div class="home-position home-md">
          <h2 class="home-title text-center">国内游</h2>
          <div class="city-menu">
            <span class="city-name hvr-underline-from-center hvr-underline-from-center-active"
                  @click="search('domestic','1')">广州</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">深圳</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">上海</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">南京</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">北京</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">杭州</span> |
            <span class="city-name hvr-underline-from-center" @click="search('domestic','1')">成都</span>
          </div>
        </div>
      </div>
      <div class="container home-domestic-contaier">
        <Row :gutter="10">
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

          </i-col-product>
        </Row>
      </div>
      <div class="text-center home-more-content" v-if="lists.length  > 0">
        <router-link class="ivu-btn-primary home-more" to="/domestic" >查看更多</router-link>
      </div>
    </section>

    <!--下划线-->
    <div class="container">
      <div class="home-order"></div>
    </div>
    <!--境外游-->
    <section class="home-domestic">
      <div class="home-domestic-bg">
        <img src="../../assets/images/abroad_bg.png" class="img-responsive"/>
        <div class="home-position home-md">
          <h2 class="home-title text-center">境外游</h2>
          <div class="city-menu">
            <span class="city-name hvr-underline-from-center hvr-underline-from-center-active"
                  @click="search('abroad','1')">广州</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">深圳</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">上海</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">南京</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">北京</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">杭州</span> |
            <span class="city-name hvr-underline-from-center" @click="search('abroad','1')">成都</span>
          </div>
        </div>
      </div>
      <div class="container home-domestic-contaier">
        <Row :gutter="10">
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

          </i-col-product>
        </Row>
      </div>
      <div class="text-center home-more-content" v-if="lists.length  > 0">
        <router-link class="ivu-btn-primary home-more" to="/abroad">查看更多</router-link>
      </div>
    </section>

  </section>
</template>


<script type="javascript">
  import IColTravel from './../../components/i-col-traevl/i-col-travel'
  import IColProduct from "./../../components/i-col-product/i-col-product";
  import NoData from "./../../components/no-data/no-data";

  export default {
    data() {
      return {
        lists: [],
        travel: [],
        repos: [],
        url: '',
        setting: {
          dots: 'inside',
          trigger: 'click',
          arrow: 'hover'
        }
      }
    },
    components: {IColTravel, IColProduct, NoData},
    created() {
      this.get_data();
      this.get_travel();
    },
    methods: {
      get_data() {
        this.$Loading.start();
        this.$http.get(
          'public/cocs',
          {params: {limit: 6}}
        ).then(res => {
          this.lists = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
          // error callback
        })
      },
      get_travel(){
        this.$http.get(
          'public/travels',
          {params: {limit: 4}}
        ).then(res => {
          this.travel = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
        })
      },
      search(type, name) {
        if (type === 'domestic') {
          this.$router.push({name: '國內游', query: {crityId: name}});
        } else {
          this.$router.push({name: '國外游', query: {crityId: name}});
        }
      }
    }
  }

</script>
