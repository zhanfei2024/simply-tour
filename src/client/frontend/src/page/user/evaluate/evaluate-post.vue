<template>
  <div class="container">
    <div class="order-body">
      <header class="my-head">
        <h2>
          訂單評價
        </h2>
      </header>
      <div class="evaluate-post">
        <Row>
          <i-col span="24">
            <div class="evaluate-post-product">
              <Row>
                <div class="evaluate-post-product-head clearfix">
                  <i-col span="14">
                    产品名称
                  </i-col>
                  <i-col span="2">单价</i-col>
                  <i-col span="4">
                    数量
                  </i-col>
                  <i-col span="4">
                    实付
                  </i-col>
                </div>
                <i-col span="14">
                  <Row :gutter="10">
                    <i-col span="6">
                      <img v-lazy="" alt="" class="image">
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
                <i-col span="4">
                  <span class="price">¥2988.00</span>
                </i-col>
                <i-col span="4">
                  <span class="price">¥2988.00</span>
                </i-col>
              </Row>
            </div>
          </i-col>
          <i-col span="24">
            <div class="evaluate-post-form">
              <Form :model="formRight" label-position="top" >
                <Row>
                  <i-col span="6">
                    <FormItem label="食宿評分">
                      <Rate show-text v-model="formRight.accommodation"></Rate>
                    </FormItem>
                  </i-col>
                  <i-col span="6">
                    <FormItem label="行程評分">
                      <Rate show-text v-model="formRight.trip"></Rate>
                    </FormItem>
                  </i-col>
                  <i-col span="6">
                    <FormItem label="服務評分">
                      <Rate show-text v-model="formRight.service"></Rate>
                    </FormItem>
                  </i-col>
                </Row>

                <FormItem>
                  <Input type="textarea" v-model="formRight.description" placeholder="说说你的旅游心得分享给其它想去旅行的朋友吧。"></Input>
                </FormItem>

                <FormItem class="text-center">
                  <Button type="primary" @click="submit()" :loading="loading" class="evaluate-post-submit">
                    <span v-if="!loading">提交評價</span>
                    <span v-else>Loading...</span>
                  </Button>
                </FormItem>
              </Form>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "evaluate-post",
    data() {
      return {
        loading: false,
        formRight: {
          description: '',
          service: 1,
          trip: 1,
          accommodation: 1
        },
      }
    },
    submit() {
      this.$http.post('user/1/evaluate').then(res => {

      }, res => {

      });
    }
  }
</script>

<style scoped>

</style>
