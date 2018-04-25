<template>
  <div class="container">
    <div class="abroad-list-container">
      <!--热门推荐-->
      <div class="abroad-list-host">
        <h1 class="home-title text-left">热门推荐</h1>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_1.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_2.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_3.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_4.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_5.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_6.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_7.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_8.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_9.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="abroad-list-item">
          <div class="abroad-list-host-icon">
            <img src="../../assets/images/abroad_icon_10.png" height="160" width="160"/>
            <span class="abroad-list-host-text">美国</span>
          </div>
        </div>
        <div class="more-content home-travel-more text-center">
          <router-link class="ivu-btn-primary abroad-more" to="/domestic">查看更多</router-link>
        </div>
      </div>
      <!--境外游 跟团游-->
      <div class="abroad-list-product">
        <Row>
          <h1 class="home-title text-left">境外游 跟团游</h1>
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

          </i-col-product>
        </Row>
      </div>
      <!--境外游 自助游-->
      <div class="abroad-list-product">
        <Row>
          <h1 class="home-title text-left">境外游 自助游</h1>
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <i-col-product :spans="6" :spanMd="8" :spanSm="12" :data="lists" v-if="lists.length  > 0">

          </i-col-product>

        </Row>
      </div>
    </div>


  </div>
</template>

<script>
  import IColProduct from "./../../components/i-col-product/i-col-product";
  import NoData from "./../../components/no-data/no-data";

  export default {
    components: {IColProduct,NoData},
    data() {
      return {
        lists: []
      }
    },
    created() {
      this.get_data()
    },
    methods: {
      get_data() {
        this.$Loading.start();
        this.$http.get(
          'public/cocs',
          {params: {limit:8}}
        ).then(res => {
          this.lists = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
          // error callback
        })
      }
    }
  }
</script>

<style scoped>

</style>
