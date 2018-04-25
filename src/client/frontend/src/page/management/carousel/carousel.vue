<template>
  <div>
    <div class="line-container order-body">
      <div class="order-menu">
        <Menu mode="horizontal" :theme="'light'" active-name="1">
          <MenuItem name="1">
            輪播圖列表
          </MenuItem>
        </Menu>
        <div class="order-position">
          <router-link class="primary-link hvr-sweep-to-right" to="/management/carousel-post">
            添加輪播圖
          </router-link>
        </div>
      </div>
      <div class="line-bodys order-bodys">
        <Row>
          <i-col span="24">
            <Row>
              <div class="line-product-head clearfix">
                <i-col span="16">
                  產品名稱
                </i-col>
                <i-col span="4">排序</i-col>
                <i-col span="4">操作</i-col>
              </div>
            </Row>
            <no-data v-if="lists.length  === 0" :isBtn="true" :postUrl="'/management/carousel-post'"
                     :text="'暫時沒有發佈輪播圖!'"></no-data>

            <div v-if="lists.length > 0">
              <div v-for="item in lists" class="evaluate-post-product line-item order-product">
                <Row>
                  <i-col span="16">
                    <i-col span="6">
                      <img v-lazy="item.picture" alt="" class="image" style="margin-left: 0">
                    </i-col>
                    <i-col span="18">
                      <h2 class="title">{{item.title}}</h2>
                    </i-col>
                  </i-col>
                  <i-col span="4">
                    <span class="number">{{item.order}}</span>
                  </i-col>
                  <i-col span="4">
                    <span class="order-link"><a class="hvr-underline-from-left">編輯</a></span>
                    <span class="order-link">
                    <Poptip
                      confirm
                      title="您確認要刪除這條內容嗎?"
                      @on-ok="ok(item.id)"
                      @on-cancel="cancel"
                      ok-text="yes"
                      cancel-text="no">
                      <a class="hvr-underline-from-left">刪除</a>
                     </Poptip>
                  </span>
                  </i-col>
                </Row>

              </div>
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
  import ICol from "iview/src/components/grid/col";
  import NoData from "./../../../components/no-data/no-data";

  export default {
    name: "order",
    components: {
      ICol,
      IColOrder,
      NoData
    },
    data() {
      return {
        lists: []
      }
    },
    created() {
      this.get_data();
    },
    methods: {
      //獲取數據
      get_data() {
        this.$http.get(
          'merchant/slide_show',
          {params: {limit: 6}}
        ).then(res => {
          this.lists = res.data.result;
        }).catch(error => {
          this.$Loading.error();
        });
      },
      // 刪除數據
      ok(slideShowId) {
        this.delete(slideShowId);
        this.$Message.success('刪除成功!');
      },
      cancel() {
        this.$Message.info('取消刪除!');
      },
      delete(slideShowId) {
        this.$http.delete(
          `merchant/slide_show${slideShowId}`
        ).then(res => {
          this.$lodash.remove(this.lists, res => {
            res.id === slideShowId;
          })
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      }
    }
  }
</script>
