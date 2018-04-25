<style lang="scss">
.home-table {
  .margin-bottom-20 {
    margin-bottom: 20px;
  }
  thead > tr {
    th:nth-child(n + 2) {
      color: transparent;
    }
  }
}
.card-content {
  padding: 20px 0;
  p {
    line-height: 20px;
  }
}
.col-wrapper {
  margin: 20px 20px;
}
.home-card-list {
  margin: 0 -22.5px !important;
}
.home-custom-table {
  border: 1px solid #dddee1;
}
.manage-title {
  background-color: #f8f8f9;
  border-bottom: 1px solid #dddee1;
  padding-left: 18px;
  font-size: 12px;
  font-weight: 700;
  line-height: 40px;
  height: 40px;
}
.manage-list {
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.manage-item {
  padding: 18px;
  text-align: center;
}
.manage-icon {
  font-size: 50px;
}
</style>
<template>
    <div class="home-table">
        <Row>
            <Col :md="24" :lg="24">
                <Row :gutter="5" class="home-card-list">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '20px'}">
                        <infor-card
                            class="col-wrapper"
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="ios-eye"
                            color="#2d8cf0"
                            intro-text="待审核旅行社"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '20px'}">
                        <infor-card
                            class="col-wrapper"
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="person-add"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="全部旅行社"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '20px'}">
                        <infor-card
                            class="col-wrapper"
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="shuffle"
                            color="#ffd572"
                            intro-text="全部线路"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '20px'}">
                        <infor-card
                            class="col-wrapper"
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="person-stalker"
                            color="#f25e43"
                            intro-text="平台总用户数"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Table :columns="columns1" :data="data1" :style="{marginBottom: '40px'}"></Table>

        <div class="home-custom-table">
           <p class="manage-title">常用功能入口</p>
           <ul class="manage-list">
               <li class="manage-item">
                   <router-link :to="'/travel/enter-manage'" class="text-center">
                        <p class="manage-icon"><Icon type="checkmark-circled"></Icon></p>
                        <p>旅行社审核</p>
                   </router-link>
               </li>
                <li class="manage-item">
                    <router-link :to="'/travel/travel-manage'" class="text-center">
                            <p class="manage-icon"><Icon type="briefcase"></Icon></p>
                            <p>旅行社管理</p>
                    </router-link>
                </li>         
                <li class="manage-item">
                   <router-link :to="'/travel/line-manage'" class="text-center">
                        <p class="manage-icon"><Icon type="shuffle"></Icon></p>
                        <p>线路管理</p>
                   </router-link>
                </li>
                <li class="manage-item">
                   <router-link :to="'/order/order-manage'" class="text-center">
                        <p class="manage-icon"><Icon type="compose"></Icon></p>
                        <p>订单管理</p>
                   </router-link>
                </li>
                <li class="manage-item">
                   <router-link :to="'/member/member-list'" class="text-center">
                        <p class="manage-icon"><Icon type="person-add"></Icon></p>
                        <p>会员管理</p>
                   </router-link>
                </li>
                <li class="manage-item">
                   <router-link :to="'/set/set-info'" class="text-center">
                        <p class="manage-icon"><Icon type="gear-a"></Icon></p>
                        <p>平台设置</p>
                   </router-link>
                </li>
           </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import InforCard from "./inforCard.vue";
export default {
  name: "Home",
  data() {
    return {
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      columns1: [
        {
          title: "待处理事务",
          key: "inter_name"
        },
        {
          title: "",
          key: "inter_num",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: "#/travel/enter-manage"
                  },
                  style: {
                    color: "red"
                  }
                },
                "( 2 )"
              )
            ]);
          }
        },
        {
          title: "",
          key: "line_name"
        },
        {
          title: "",
          key: "line_num",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: "#/travel/line-manage"
                  },
                  style: {
                    color: "red"
                  }
                },
                "( 2 )"
              )
            ]);
          }
        },
        {
          title: "",
          key: "order_name"
        },
        {
          title: "",
          key: "order_num",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: "#/order/order-manage"
                  },
                  style: {
                    color: "red"
                  }
                },
                "( 2 )"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          inter_name: "旅行社入驻审核",
          inter_num: "（2）",
          line_name: "旅行社线路管理",
          line_num: "（2）",
          order_name: "待处理订单",
          order_num: "（2）"
        }
      ]
    };
  },
  components: { InforCard }
};
</script>


