<template>
  <div>
    <div class="center-container">
      <div class="order-body">
        <header class="my-head">
          <h2>
            收藏的線路
          </h2>
        </header>
        <div class="body">
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有收藏的线路!'"></no-data>
          <div v-if="lists.length > 0" class="order-list">
            <div class="order-item">
              <Row>
                <i-col span="20" class="order-right padingTop">
                  <Row>
                    <i-col span="5">
                      <img v-lazy="" alt="" class="image">
                    </i-col>
                    <i-col span="19" style="padding-left: 5px">
                      <h4 class="order-title">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                      <p class="text order-evaluate-text">产品类型：跟团游</p>
                    </i-col>
                  </Row>
                </i-col>
                <i-col span="4" class="text-center">
                  <span class="money line-height">¥2988.00</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div v-if="lists.length > 0" class="order-list">
            <div class="order-item">
              <Row>
                <i-col span="20" class="order-right padingTop">
                  <Row>
                    <i-col span="5">
                      <img v-lazy="" alt="" class="image">
                    </i-col>
                    <i-col span="19" style="padding-left: 5px">
                      <h4 class="order-title">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                      <p class="text order-evaluate-text">产品类型：跟团游</p>
                    </i-col>
                  </Row>
                </i-col>
                <i-col span="4" class="text-center">
                  <span class="money line-height">¥2988.00</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div v-if="lists.length > 0" class="order-list">
            <div class="order-item">
              <Row>
                <i-col span="20" class="order-right padingTop">
                  <Row>
                    <i-col span="5">
                      <img v-lazy="" alt="" class="image">
                    </i-col>
                    <i-col span="19" style="padding-left: 5px">
                      <h4 class="order-title">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                      <p class="text order-evaluate-text">产品类型：跟团游</p>
                    </i-col>
                  </Row>
                </i-col>
                <i-col span="4" class="text-center">
                  <span class="money line-height">¥2988.00</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div v-if="lists.length > 0" class="order-list">
            <div class="order-item">
              <Row>
                <i-col span="20" class="order-right padingTop">
                  <Row>
                    <i-col span="5">
                      <img v-lazy="" alt="" class="image">
                    </i-col>
                    <i-col span="19" style="padding-left: 5px">
                      <h4 class="order-title">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                      <p class="text order-evaluate-text">产品类型：跟团游</p>
                    </i-col>
                  </Row>
                </i-col>
                <i-col span="4" class="text-center">
                  <span class="money line-height">¥2988.00</span>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="page-content" v-if="lists.length > 0">
      <Page :total="100"></Page>
    </div>
  </div>
</template>

<script>
  import IColProduct from "./../../../components/i-col-product/i-col-product";
  import IColTravel from './../../../components/i-col-traevl/i-col-travel'
  import NoData from "./../../../components/no-data/no-data";


  export default {
    components: {IColProduct, IColTravel,NoData},
    data() {
      return {
        lists: [],
        isLine: true
      }
    },
    created() {
      this.get_data()
    },
    beforeUpdate() {
      console.log(this.$route.params.name,"#33333333")
      if (this.$route.params.name === 'line') {
        this.isLine = true;
      } else {
        this.isLine = false;
        console.log(this.isLine,'3333333333')
      }
    },
    methods: {
      get_data() {
        this.$Loading.start();
        this.$http.get(
          'public/cocs',
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
