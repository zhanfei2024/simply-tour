<template>
  <div>
    <div class="line-container order-body">
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
        <div class="order-position">
          <router-link class="primary-link hvr-sweep-to-right" to="/management/line-post">
            發佈新線路
          </router-link>
        </div>
      </div>
      <div class="line-bodys order-bodys">
        <Row>
          <i-col span="24">
            <Row>
              <div class="line-product-head clearfix">
                <i-col span="16">
                  产品名称
                </i-col>
                <i-col span="4">排序</i-col>
                <i-col span="4">操作</i-col>
              </div>
            </Row>
            <no-data v-if="lists.length  === 0" :isBtn="true" :postUrl="'/management/line-post'" :text="'暂时没有发布线路!'"></no-data>
            <div v-if="lists.length > 0" class="evaluate-post-product line-item order-product">
              <Row>
                <i-col span="16">
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image" style="margin-left: 0">
                  </i-col>
                  <i-col span="18">
                    <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                    <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                    <p class="text ">出发时间：2017-12-05 (星期二) <a class="danger" @click="modal8 = true"
                                                              style="margin-left: 40px">(審核中)</a></p>
                  </i-col>
                </i-col>
                <i-col span="4">
                  <span class="number">100</span>
                </i-col>
                <i-col span="4">
                  <span class="order-link"><a class="hvr-underline-from-left">編輯</a></span>
                  <span class="order-link">
                     <Poptip
                       confirm
                       title="您确认删除这条内容吗?"
                       @on-ok="ok"
                       @on-cancel="cancel"
                       ok-text="yes"
                       cancel-text="no">
                      <a class="hvr-underline-from-left">刪除</a>
                     </Poptip>
                  </span>
                </i-col>
              </Row>

            </div>
            <div v-if="lists.length > 0" class="evaluate-post-product line-item order-product">
              <Row>
                <i-col span="16">
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image" style="margin-left: 0">
                  </i-col>
                  <i-col span="18">
                    <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                    <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                    <p class="text ">出发时间：2017-12-05 (星期二) <a class="danger" @click="modal8 = true"
                                                              style="margin-left: 40px">(審核中)</a></p>
                  </i-col>
                </i-col>
                <i-col span="4">
                  <span class="number">100</span>
                </i-col>
                <i-col span="4">
                  <span class="order-link"><a class="hvr-underline-from-left">編輯</a></span>
                  <span class="order-link">
                     <Poptip
                       confirm
                       title="您确认删除这条内容吗?"
                       @on-ok="ok"
                       @on-cancel="cancel"
                       ok-text="yes"
                       cancel-text="no">
                      <a class="hvr-underline-from-left">刪除</a>
                     </Poptip>
                  </span>
                </i-col>
              </Row>

            </div>
            <div v-if="lists.length > 0" class="evaluate-post-product line-item order-product">
              <Row>
                <i-col span="16">
                  <i-col span="6">
                    <img v-lazy="" alt="" class="image" style="margin-left: 0">
                  </i-col>
                  <i-col span="18">
                    <h2 class="title">大西洋号东莞出发深圳往返 深圳太子湾</h2>
                    <p class="text text-bottom">产品类型：跟团游 出发地：广州 出行人数：2成人 1儿童</p>
                    <p class="text ">出发时间：2017-12-05 (星期二) <a class="danger" @click="modal8 = true"
                                                              style="margin-left: 40px">(審核中)</a></p>
                  </i-col>
                </i-col>
                <i-col span="4">
                  <span class="number">100</span>
                </i-col>
                <i-col span="4">
                  <span class="order-link"><a class="hvr-underline-from-left">編輯</a></span>
                  <span class="order-link">
                     <Poptip
                       confirm
                       title="您确认删除这条内容吗?"
                       @on-ok="ok"
                       @on-cancel="cancel"
                       ok-text="yes"
                       cancel-text="no">
                      <a class="hvr-underline-from-left">刪除</a>
                     </Poptip>
                  </span>
                </i-col>
              </Row>

            </div>
          </i-col>
        </Row>
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
    components: {
      IColOrder,
      NoData
    },
    data(){
      return{
        lists:[]
      }
    },
    methods: {
      ok() {
        this.$Message.success('删除成功');
      },
      cancel() {
        this.$Message.info('You click cancel');
      }
    }

  }
</script>

<style scoped>

</style>
