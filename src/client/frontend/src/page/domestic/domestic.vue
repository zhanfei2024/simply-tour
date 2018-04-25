<template>
    <div class="container">
        <!-- 起始目的地选择开始 -->
        <div class="top_tip">
            <div class="tip_box">
                <div class="place">
                    <div class="start_place">香港</div>
                    占位图
                    <input class="end_place" type="text" name="" placeholder="输入目的地" id="">
                </div>
                <a href="" class="go_now">
                    <i>马上去</i>
                </a>
            </div>
        </div>
        <!-- 起始目的地选择结束 -->

        <Row>
            <i-col span="20">
              <div class="travel_list_left">
                <!-- 地区选择开始 -->
                <span class="inland" v-show="$route.path !== '/search'">国内游</span>
                <span class="inland" v-show="$route.path === '/search'">搜索结果</span>
                <div class="inland_place">
                  <span class="title left">目的地</span>
                  <ul class="clear">
                    <li class="select">全部</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>沙田</li>
                    <li>沙田</li>
                  </ul>
                </div>
                <div class="inland_type">
                  <span class="title left">类型</span>
                  <ul class="clear">
                    <li class="select">全部</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                    <li>九龙</li>
                    <li>铜锣湾</li>
                    <li>沙田</li>
                  </ul>
                </div>
                <!-- 地区选择结束 -->

                <!-- 旅游列表开始 -->
                <ul class="travel_list">
                  <li>
                    <div class="travel_img">
                      <img v-lazy="" alt="旅游图片">
                    </div>
                    <div class="travel_info">
                      <div class="travel_title">
                        <i>大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋</i>
                      </div>
                      <div class="travel_details">
                        <i class="travel_place"><Icon type="ios-flag"></Icon> 香港</i>
                        <i class="travel_price">$:249起</i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="travel_img">
                      <img v-lazy="" alt="旅游图片">
                    </div>
                    <div class="travel_info">
                      <div class="travel_title">
                        <i>大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋</i>
                      </div>
                      <div class="travel_details">
                        <i class="travel_place"><Icon type="ios-flag"></Icon> 香港</i>
                        <i class="travel_price">$:249起</i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="travel_img">
                      <img v-lazy="" alt="旅游图片">
                    </div>
                    <div class="travel_info">
                      <div class="travel_title">
                        <i>大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋</i>
                      </div>
                      <div class="travel_details">
                        <i class="travel_place"><Icon type="ios-flag"></Icon> 香港</i>
                        <i class="travel_price">$:249起</i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="travel_img">
                      <img v-lazy="" alt="旅游图片">
                    </div>
                    <div class="travel_info">
                      <div class="travel_title">
                        <i>大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋洋大西洋大西洋大西洋大西洋大西洋大西洋</i>
                      </div>
                      <div class="travel_details">
                        <i class="travel_place"><Icon type="ios-flag"></Icon> 香港</i>
                        <i class="travel_price">$:249起</i>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- 旅游列表结束 -->
                <!-- 分页开始 -->
                <Page :total="100" class="paging"></Page>
                <!-- 分页结束 -->
              </div>
            </i-col>


            <i-col span="4">
              <div class="travel-home-right">
                <h2 class="product-recommend-title">热门线路推荐</h2>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="product-recommend-item">
                  <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-recommend-container">
                      <img v-lazy="" class="img-responsive" style="height: 120px;width: 100%;">
                      <div class="product-content">
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                          <span class="pull-left product-money">$2999元起</span>
                          <span class="pull-right product-address">廣州出發</span>
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>

              </div>
            </i-col>

        </Row>


        <!-- 地区-->
        <!-- <Row>
            <i-col span="2">
                地区：
            </i-col>
            <i-col span="22">
                <a @click="search('city','1')">北京</a>
                <Tag checkable color="green">上海</Tag>
                <Tag checkable color="red">南京</Tag>
                <Tag checkable color="yellow">河北</Tag>
                <Tag checkable color="blue">北京</Tag>
                <Tag checkable color="green">上海</Tag>
                <Tag checkable color="red">南京</Tag>
                <Tag checkable color="yellow">河北</Tag>
                <Tag checkable color="blue">北京</Tag>
                <Tag checkable color="green">上海</Tag>
            </i-col>
            <i-col span="2">
                类型：
            </i-col>
            <i-col span="22">
                <a @click="search('strong','1')">跟团游</a>
                <Tag checkable color="green">自助游</Tag>
            </i-col>
        </Row>

        <div style="margin-top: 30px">
            <Row :gutter="10">
                <i-col-product :spans="6" :spanMd="8" :spanSm="12"s="6" :data="lists">

                </i-col-product>
            </Row>
            <Row>
                <i-col span="12" offset="10">
                    <Page :total="100"></Page>

                </i-col>
            </Row>
        </div> -->
    </div>

</template>

<script>
import IColProduct from "./../../components/i-col-product/i-col-product";

export default {
  components: { IColProduct },
  data() {
    return {
      querys: {},
      lists: []
    };
  },
  created() {
    this.get_data();
  },
  methods: {
    get_data() {
      this.$Loading.start();
      this.$http.get("public/cocs").then(
        res => {
          this.lists = res.data.result;
          this.$Loading.finish();
        },
        res => {
          this.$Loading.error();
          // error callback
        }
      );
    },
    search(type, searctText) {
      this.addQuerys(type, searctText);
    },
    addQuerys(type, searctText) {
      switch (type) {
        case "city":
          if (!this.$lodash.has(this.querys, "cityId")) {
            this.querys.cityId = searctText;
          } else {
            this.querys = this.$lodash.omit(this.querys, ["cityId"]);
          }
          this.$router.push({ name: "國內游", query: this.querys });
          break;
        case "strong":
          if (!this.$lodash.has(this.querys, "strong")) {
            this.querys.strong = searctText;
          } else {
            this.querys = this.$lodash.omit(this.querys, ["strong"]);
          }
          this.$router.push({ name: "國內游", query: this.querys });
          break;
      }
    }
  }
};
</script>
