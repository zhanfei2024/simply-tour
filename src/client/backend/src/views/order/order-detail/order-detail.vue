<template>
  <div class="order-detail">
        <Card class="margin-bottom-20">
            <p slot="title">当前订单状态：待处理</p>
            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">基本信息</h4>
                <Table border :columns="columns1" :data="data1"></Table>
            </section>

            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">产品信息</h4>
                <Table :columns="columns2" :data="data2"></Table>
            </section>

            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">联系人信息</h4>
                <Table :columns="columns3" :data="data3"></Table>
            </section>


            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">出行人信息</h4>
                <Table :columns="columns4" :data="data4"></Table>
            </section>

        </Card>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'OrderDetail',
    data() {
      return {
          columns1: [
                    {
                        title: '订单编号',
                        key: 'order_num'
                    },
                    {
                        title: '提交时间',
                        key: 'submit_time'
                    },
                    {
                        title: '用户账号',
                        key: 'user_account'
                    },
                    {
                        title: '订单状态',
                        key: 'status'
                    },
                    
          ],
          data1: [
              {
                  order_num: 'John 254856958692Brown',
                  submit_time: '2017-12-13 09：18',
                  user_account: '18625252525',
                  status: '待处理'
              }
          ],
          columns2: [
            {
              title: '产品名称',
              key: 'product'
            },
            {
              title: '单价',
              key: 'price'
            },
            {
              title: '数量',
              key: 'num'
            },
            {
              title: '实付',
              key: 'money'
            }
          ],
          data2: [{
            product: `大西洋号东莞出发深圳往返 深圳太子湾
                      产品类型：跟团游   出发地：广州  出行人数：2成人 1儿童
                      出发时间：2017-12-05 (星期二)`,
            price: '¥249',
            num: '1',
            money: '¥249'
          }],
          columns3: [
              {title: '姓名', key: 'name'}, {title: '手机号码', key: 'phone'}
          ],
          data3: [{name: 'test', 'phone': '156667777'}],
          columns4: [
              {title: '编号', key: 'num'}, {title: '姓名', key: 'name'}, {title: '电话号码', key: 'phone'}, {title: '证件类型', key: 'id_type'}, {title: '证件号码', key: 'id'}
          ],
          data4: [{num: '111111', name: 'www', phone: '266666', id_type: '身份证', id: '2222' }]
    }
  },
    components: {

  }
}
</script>

<style scoped lang="stylus">
</style>
