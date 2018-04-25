<template>
  <div>
    <div class="order-body">
      <div class="order-menu">
        <Menu mode="horizontal" :theme="'light'" active-name="1">
          <MenuItem name="1">
            全部線路(55)
          </MenuItem>
          <MenuItem name="2">
            已上线(40)
          </MenuItem>
          <MenuItem name="3">
            审核中(15)
          </MenuItem>
          <MenuItem name="4">
            隐藏线路(15)
          </MenuItem>
        </Menu>
      </div>
      <div class="body">
        <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有线路订单!'"></no-data>

        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="true">

        </i-col-order>
        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="true">

        </i-col-order>
        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="true">

        </i-col-order>
        <i-col-order v-if="lists.length > 0" :type="'management'" :isShow="true">

        </i-col-order>
      </div>
    </div>
    <div class="page-content" v-if="lists.length > 0">
      <Page :total="100"></Page>
    </div>
  </div>
</template>

<script>
  import IColOrder from "./../../../components/i-col-order/i-col-order";
  import NoData from "./../../../components/no-data/no-data";

  export default {
    name: "order",
    components: {IColOrder,NoData},
    data(){
      return{
        lists:[]
      }
    }
  }
</script>

<style scoped>

</style>
