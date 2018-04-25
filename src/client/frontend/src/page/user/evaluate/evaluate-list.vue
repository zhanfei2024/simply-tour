<template>
  <div class="center-container">
    <div class="order-body">
      <header class="my-head">
        <h2>
          評價訂單
        </h2>
      </header>
      <div class="body">
        <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有评价订单!'"></no-data>
        <div v-if="lists.length > 0" class="order-list">
          <div class="order-item">
            <Row>
              <i-col span="16" class="order-right padingTop">
                <Row>
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image">
                  </i-col>
                  <i-col span="18" style="padding-left: 0px">
                    <h4 class="order-title text-overflow">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                    <p class="text order-evaluate-text">产品类型：跟团游</p>
                  </i-col>
                </Row>
              </i-col>
              <i-col span="4" class="text-center order-right">
                <span class="money line-height">¥2988.00</span>
              </i-col>
              <i-col span="4" class="text-center">
          <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/user/evaluate/1/post`">發佈評價</router-link>
          </span>
              </i-col>
            </Row>
          </div>
        </div>
        <div v-if="lists.length > 0" class="order-list">
          <div class="order-item">
            <Row>
              <i-col span="16" class="order-right padingTop">
                <Row>
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image">
                  </i-col>
                  <i-col span="18" style="padding-left: 0px">
                    <h4 class="order-title text-overflow">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                    <p class="text order-evaluate-text">产品类型：跟团游</p>
                  </i-col>
                </Row>
              </i-col>
              <i-col span="4" class="text-center order-right">
                <span class="money line-height">¥2988.00</span>
              </i-col>
              <i-col span="4" class="text-center">
          <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/user/evaluate/1/post`">發佈評價</router-link>
          </span>
              </i-col>
            </Row>
          </div>
        </div>
        <div v-if="lists.length > 0" class="order-list">
          <div class="order-item">
            <Row>
              <i-col span="16" class="order-right padingTop">
                <Row>
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image">
                  </i-col>
                  <i-col span="18" style="padding-left: 0px">
                    <h4 class="order-title text-overflow">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                    <p class="text order-evaluate-text">产品类型：跟团游</p>
                  </i-col>
                </Row>
              </i-col>
              <i-col span="4" class="text-center order-right">
                <span class="money line-height">¥2988.00</span>
              </i-col>
              <i-col span="4" class="text-center">
          <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/user/evaluate/1/post`">發佈評價</router-link>
          </span>
              </i-col>
            </Row>
          </div>
        </div>
        <div v-if="lists.length > 0" class="order-list">
          <div class="order-item">
            <Row>
              <i-col span="16" class="order-right padingTop">
                <Row>
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image">
                  </i-col>
                  <i-col span="18" style="padding-left: 0px">
                    <h4 class="order-title text-overflow">大西洋号东莞出发深圳往返 深圳太子湾</h4>
                    <p class="text order-evaluate-text">产品类型：跟团游</p>
                  </i-col>
                </Row>
              </i-col>
              <i-col span="4" class="text-center order-right">
                <span class="money line-height">¥2988.00</span>
              </i-col>
              <i-col span="4" class="text-center">
          <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/user/evaluate/1/post`">發佈評價</router-link>
          </span>
              </i-col>
            </Row>
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
  import IColOrder from "./../../../components/i-col-order/i-col-order";
  import NoData from "./../../../components/no-data/no-data";

  export default {
    components: {IColProduct, IColOrder,NoData},
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

