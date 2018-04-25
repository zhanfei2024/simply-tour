<template>
  <div class="center-container">
    <div class="order-body" style="min-height: 500px">
      <header class="my-head">
        <h2>我的订单
          <router-link class="hvr-sweep-to-right" to="/management/order-list" style="float: right">
            查看全部
          </router-link>
        </h2>
      </header>
      <div class="body">
        <no-data v-if="lists.length  === 0" :isBtn="false"  :text="'暂时没有线路订单!'"></no-data>

        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="false">

        </i-col-order>
        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="false">

        </i-col-order>
        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="false">

        </i-col-order>

      </div>
    </div>

    <div class="line-body">
      <header class="my-head" style="border-bottom: 1px solid #DCDCDC">
        <h2>最新發佈線路
          <router-link class="hvr-sweep-to-right" to="/travel/1/home" style="float: right">
            查看全部
          </router-link>
        </h2>
      </header>

      <div class="product-body">
        <Row :gutter="20">
          <no-data v-if="lists.length  === 0" :isBtn="true" :postUrl="'/management/line-post'" :text="'暂时没有发布最新线路!'"></no-data>
          <i-col-product :spans="8" :data="lists" v-if="lists.length  > 0">

          </i-col-product>
        </Row>
      </div>
    </div>
  </div>

</template>

<script>


  import IColProduct from "./../../../components/i-col-product/i-col-product";
  import IColOrder from "./../../../components/i-col-order/i-col-order";
  import NoData from "./../../../components/no-data/no-data";

  export default {
    components: {IColProduct,IColOrder,NoData},
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
          {params: {limit:6}}
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
