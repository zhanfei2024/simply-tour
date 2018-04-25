<template>
  <div>
    <div class="center-container">
      <div class="order-body clearfix">
        <header class="my-head">
          <h2>
            收藏的旅行社
          </h2>
        </header>
        <div class="collection-body clearfix">
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有收藏的线路!'"></no-data>

          <i-col-travel :spans="6" :data="lists" v-if="lists.length  > 0">

          </i-col-travel>
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
    components: {IColProduct, IColTravel, NoData},
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
      if (this.$route.params.name === 'line') {
        this.isLine = true;
      } else {
        this.isLine = false;
        console.log(this.isLine, '3333333333')
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
