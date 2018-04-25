<template>
  <div class="order-detail">
        <Card class="margin-bottom-20">
            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">基本信息</h4>
                <Table border :columns="columns1" :data="data1"></Table>
            </section>

            <section class="custom-table margin-bottom-20">
                <h4 class="custom-table-title">订单记录</h4>
                <Table :columns="columns2" :data="data2"></Table>
                <Page :total="100" show-elevator></Page>
            </section>

        </Card>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'MemberDtail',
    data() {
      return {
          columns1: [
                    {
                        title: '账户',
                        key: 'account'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '生日',
                        key: 'birthday'
                    },
                    {
                        title: '真实姓名',
                        key: 'name'
                    },
                    {
                        title: '身份证号码',
                        key: 'id'
                    },
                    {
                        title: '邮箱',
                        key: 'mail'
                    },
                    
          ],
          data1: [
              {
                  account: 'John 254856958692Brown',
                  sex: '2017-12-13 09：18',
                  birthday: '18625252525',
                  name: '待处理',
                  id: '22222222222',
                  mail: '22222@www.com'
              }
          ],
          columns2: [
            {
              title: '订单编号',
              key: 'account_num'
            },
            {
              title: '下单时间',
              key: 'submit_time'
            },
            {
              title: '用户账户',
              key: 'user_account'
            },
            {
              title: '订单金额',
              key: 'price'
            },
            {
              title: '订单状态',
              key: 'status'
            },
            {
              title: '操作',
              key: 'operate',
                render: (h, params) => {
                    return h('div', [
                        h('a', {
                            attrs: {
                                href: '/#/order/order-detail/1'
                            },
                            style: {
                                width: '15px',
                                height: '15px',
                                cursor: 'pointer'
                            },
                        }, '查看'),
                    ]);
                }      
            }
          ],
          data2: [{
            account_num: `254856958692`,
            submit_time: '2017-12-13 09：18',
            user_account: '18656895689',
            price: '¥249',
            status: '888',
            operate: '查看订单'
          }],
    }
  },
    components: {

  }
}
</script>

<style scoped lang="stylus">
</style>
