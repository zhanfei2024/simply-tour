<template>
  <div>
    <div class="user-order-details order-body">
      <header class="order-head">
        <p class="contact">
          联系人：张德彪
          <span class="order-date">联系电话：18612345678</span>
        </p>
        <span>
           订单编号: 62205697599

          <span class="order-date">下单时间: 2018-01-06 17:09</span>
        </span>

        <div class="order-position">
           <span class="order-link">
                      <a class="hvr-underline-from-left" @click="modal8 = true">取消订单</a>
             </span>
          <router-link class="primary-link hvr-sweep-to-right" to="/user/order-list">
            取消订单
          </router-link>

        </div>
      </header>
      <div class="order-bodys management-dody">
        <Row>
          <i-col span="24">
            <div class="order-profile">
              <h2 class="product-title">
                产品信息
              </h2>
              <Row>
                <div>
                  <i-col span="24">
                    <div>
                      <Row>
                        <div class="evaluate-post-product-head clearfix">
                          <i-col span="16">
                            产品名称
                          </i-col>
                          <i-col span="2">单价</i-col>
                          <i-col span="3">
                            数量
                          </i-col>
                          <i-col span="3">
                            实付
                          </i-col>
                        </div>
                      </Row>
                      <div class="evaluate-post-product order-product">
                        <Row>
                          <i-col span="16">
                            <Row :gutter="10">
                              <i-col span="6">
                                <img v-lazy="" alt="" class="image" style="margin-left: 5px;">
                              </i-col>
                              <i-col span="18">
                                <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                                <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                                <p class="text ">出发时间：2017-12-05 (星期二) <a class="primary" @click="modal8 = true" style="margin-left: 40px">修改时间</a></p>
                              </i-col>
                            </Row>
                          </i-col>
                          <i-col span="2">
                            <span class="number">100</span>
                          </i-col>
                          <i-col span="3">
                            <span class="price">¥2988.00</span>
                          </i-col>
                          <i-col span="3">
                            <span class="price">¥2988.00</span>
                          </i-col>
                        </Row>

                      </div>
                      <div class="evaluate-post-product order-product">
                        <Row>
                          <i-col span="16">
                            <Row :gutter="10">
                              <i-col span="6">
                                <img v-lazy="" alt="" class="image" style="margin-left: 5px;">
                              </i-col>
                              <i-col span="18">
                                <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                                <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                                <p class="text ">出发时间：2017-12-05 (星期二) <a class="primary" @click="modal8 = true" style="margin-left: 40px">修改时间</a></p>
                              </i-col>
                            </Row>
                          </i-col>
                          <i-col span="2">
                            <span class="number">100</span>
                          </i-col>
                          <i-col span="3">
                            <span class="price">¥2988.00</span>
                          </i-col>
                          <i-col span="3">
                            <span class="price">¥2988.00</span>
                          </i-col>
                        </Row>

                      </div>

                    </div>
                  </i-col>
                </div>
              </Row>
            </div>
          </i-col>
          <i-col span="24">
            <div class="order-contact">
              <h2 class="product-title">联系人信息</h2>
              <p class="text">联系人 : 张德标 联系方式 : 18612345678 </p>
            </div>
          </i-col>
          <i-col span="24">
            <div class="order-table">
              <h2 class="product-title">
                出行人信息
              </h2>
              <Table stripe :columns="columns1" :data="data1"></Table>
            </div>
          </i-col>
        </Row>
      </div>
    </div>

    <Modal v-model="modal8" width="400" :mask-closable="false">
      <p slot="header">
        <span>修改出行时间</span>
      </p>
      <Form ref="formTop" :model="formTop" label-position="top">
        <FormItem prop="startDate">
          <DatePicker type="date" v-model="formTop.startDate" placeholder="请选择出行时间"
                      style="width: 100%"></DatePicker>
        </FormItem>
      </Form>


      <div slot="footer" style="margin-top: 38px">
        <Button type="primary" size="large" long :loading="loading">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal8: false,
        loading: false,
        formTop:{
          startDate:''
        },
        columns1: [
          {
            title: '编号',
            key: 'name'
          },
          {
            title: '姓名',
            key: 'age'
          },
          {
            title: '电话号码',
            key: 'address'
          },
          {
            title: '证件类型',
            key: 'type'
          },
          {
            title: '证件号码',
            key: 'nember'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
