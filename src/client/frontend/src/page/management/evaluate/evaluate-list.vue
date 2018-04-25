<template>
  <div class="">
    <div class="order-body">
      <div class="order-menu">
        <Menu mode="horizontal" :theme="'light'" active-name="1">
          <MenuItem name="1">
            待回復訂單
          </MenuItem>
          <MenuItem name="2">
            已回復訂單
          </MenuItem>
        </Menu>
      </div>
      <div class="evaluate-post">
        <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有待回复评价订单!'"></no-data>
        <div v-if="lists.length > 0" class="m-evaluate-post-item">
          <Row>
            <i-col span="24">
              <div class="evaluate-post-product m-evaluate-post-product">
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
                        <img v-lazy="" alt="" class="image" style="margin-left: 0">
                      </i-col>
                      <i-col span="18">
                        <div style="padding-left: 20px">
                          <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                          <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                          <p class="text ">出发时间：2017-12-05 (星期二)</p>
                        </div>
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
              <div class="evaluate-post-form m-evaluate-post-form">
                <Form :model="formRight" label-position="top" >
                  <div>
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
                      <i-col span="6">
                        <FormItem class="text-center">
                          <Button type="primary" @click="isReply = !isReply" :loading="loading" class="evaluate-post-submit">
                            <span v-if="!loading">回復</span>
                            <span v-else>Loading...</span>
                          </Button>
                        </FormItem>
                      </i-col>
                    </Row>
                    <div class="evaluate-description">
                      评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾
                      ，吃得也还不错!
                    </div>

                    <FormItem v-if="isReply">
                      <Input type="textarea" v-model="formRight.description" placeholder="说说你的旅游心得分享给其它想去旅行的朋友吧。"></Input>
                    </FormItem>
                  </div>
                </Form>
              </div>
            </i-col>
          </Row>
        </div>
        <div v-if="lists.length > 0" class="m-evaluate-post-item">
          <Row>
            <i-col span="24">
              <div class="evaluate-post-product m-evaluate-post-product">
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
                        <img v-lazy="" alt="" class="image" style="margin-left: 0">
                      </i-col>
                      <i-col span="18">
                        <div style="padding-left: 20px">
                          <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                          <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                          <p class="text ">出发时间：2017-12-05 (星期二)</p>
                        </div>
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
              <div class="evaluate-post-form m-evaluate-post-form">
                <Form :model="formRight" label-position="top" >
                  <div>
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
                      <i-col span="6">
                        <FormItem class="text-center">
                          <Button type="primary" @click="isReply = !isReply" :loading="loading" class="evaluate-post-submit">
                            <span v-if="!loading">回復</span>
                            <span v-else>Loading...</span>
                          </Button>
                        </FormItem>
                      </i-col>
                    </Row>
                    <div class="evaluate-description">
                      评价晚了点儿，很棒，导游特别棒，驴妈妈真是很值得信赖，国内国外我们报了三次跟团了，导游相当专业，这次泰国行玩海也特别过瘾
                      ，吃得也还不错!
                    </div>

                    <FormItem v-if="isReply">
                      <Input type="textarea" v-model="formRight.description" placeholder="说说你的旅游心得分享给其它想去旅行的朋友吧。"></Input>
                    </FormItem>
                  </div>
                </Form>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoData from "./../../../components/no-data/no-data";
  export default {
    name: "evaluate-post",
    components: {NoData},
    data() {
      return {
        loading: false,
        isReply: false,
        lists:[],
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
