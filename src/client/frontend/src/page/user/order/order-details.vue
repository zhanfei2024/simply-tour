<template>
  <div>
    <div class="user-order-details order-body">
      <header class="order-head">
        订单编号: 62205697599

        <span class="order-date">下单时间: 2018-01-06 17:09</span>
        <span class="pull-right order-status">等待商家确认</span>
      </header>
      <div class="order-bodys">
        <Row>
          <i-col span="24">
            <div class="order-status-step text-center">
              <Row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="4">
                  <p class="step-name"><span class="step-number">1</span> 提交订单</p>
                  <p class="step-date">2018-01-06 17:09</p>
                </i-col>
                <i-col span="4">
                  <p class="step-name active"><span class="step-number">2</span> 待商家確認</p>
                  <p class="step-date active-date">2018-01-06 17:09</p>
                </i-col>
                <i-col span="4">
                  <p class="step-name"><span class="step-number">3</span> 商家確認</p>
                  <p class="step-date">2018-01-06 17:09</p>
                </i-col>
                <i-col span="4">
                  <p class="step-name"><span class="step-number">4</span> 交易完成</p>
                  <p class="step-date">2018-01-06 17:09</p>
                </i-col>
              </Row>
            </div>
          </i-col>
          <i-col span="24">
            <div class="order-profile">
              <h2 class="product-title">
                产品信息
              </h2>
              <Row>
                <div>
                  <i-col span="24">
                    <div >
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
                                <p class="text ">出发时间：2017-12-05 (星期二)</p>
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
                                <p class="text ">出发时间：2017-12-05 (星期二)</p>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
