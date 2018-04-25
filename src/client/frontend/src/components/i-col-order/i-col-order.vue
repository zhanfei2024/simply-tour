<template>
  <div class="order-list">
    <div class="order-item">
      <Row>

        <i-col span="16" class="order-right padingTop">
          <Row>
            <header class="order-head" v-if="isShow">
              下单时间：2018-01-08 15:02
              <span class="order-code">订单编号：62205697599</span>
            </header>
            <i-col span="6">
              <img v-lazy="" alt="" class="image">
            </i-col>
            <i-col span="18" style="padding-left: 5px">
              <h4 class="order-title text-overflow">大西洋号东莞出发深圳往返 深圳太子湾</h4>
              <p class="text">出发时间：2017-12-05 (星期二)</p>
              <p class="text">产品类型：跟团游 | 出行人数：2成人 1儿童 | 出发地：广州</p>
            </i-col>
          </Row>
        </i-col>
        <i-col span="4" class="text-center order-right">
          <span class="money" :class="{'line-heights' : isShow, 'line-height': !isShow}">¥2988.00</span>
        </i-col>
        <i-col span="4" class="text-center">
          <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/${type}/order/1/details`">查看详情</router-link>
            <p class="text">待商家确认</p>
          </span>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      type: String,
      isShow: false
    },
  }
</script>

