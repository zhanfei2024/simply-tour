<template>
    <div class="line-detail home-table">
        <Card  class="margin-bottom-20">
            <p slot="title">
                用户信息
            </p>
            <a href="#" slot="extra">
                <Button class="pull-right">不通过</Button>
                <Button class="pull-right" style="margin-right: 20px" type="primary">通过</Button>
            </a>
            <h5 class="title">产品信息</h5>
            <table class="detail-table1">
                <tr>
                    <th>线路名称</th>
                    <th>线路类型</th>
                    <th>产品性质</th>
                    <th>旅行社名称</th>
                </tr>
                <tr>
                    <th>大西洋号东莞出发深圳往返</th>
                    <th>国内游</th>
                    <th>跟团游</th>
                    <th>四川省中国青年旅行社少城分社</th>
                </tr>
                <tr>
                    <th>出发城市</th>
                    <th>线路价格</th>
                    <th>发团日期</th>
                    <th>指定时间段</th>
                </tr>
                <tr>
                    <th>香港九龙</th>
                    <th>成人价：¥ 888.00 儿童价：¥ 888.00</th>
                    <th>天天发团</th>
                    <th>开始时间：2017-08-23 开始时间：2017-08-23</th>
                </tr>
            </table>

            <section>
              <h5>线路特色</h5>
              <p class="section-contant">中国天使投资协会是由维护会员合法权使投定的投资机制，寻求合理的投资方式，为天使投资人打造坚实的投资平台，让天使投</p>
            </section>

            <section>
              <h5>参考行程</h5>
              <ul class="section-contant">
                <li><span>第1天</span><span>大皇宫>玉佛寺</span></li>
                <li><span>第2天</span><span>大皇宫>玉佛寺</span></li>
                <li><span>第3天</span><span>大皇宫>玉佛寺</span></li>
                <li><span>第4天</span><span>大皇宫>玉佛寺</span></li>
              </ul>
            </section>

            <section>
              <h5>费用说明</h5>
              <ul class="section-contant">
                <li><span>住宿：</span><span>大理、丽江、香格里拉、泸沽湖入住当地特色客栈或酒店</span></li>
                <li><span>交通：</span><span>丽江接送机.丽江一天专车使用，丽江城内20KM内；城市间大交通。</span></li>
                <li><span>酒吧：</span><span>丽江古城内指定合作酒吧每人赠送啤酒一瓶（赠送项目，不使用费用不退不减）</span></li>
                <li><span>餐饮：</span><span>特别赠送拉市海玛卡炖鸡火锅一份，丽江知名美食街：“黑山羊一条街”内指定合作餐厅赠送（丽江粑粑一份、南瓜饼一份、玛咖酒一壶、五味子酒一壶、青梅酒一壶5选2）</span></li>
              </ul>
            </section>

            <section>
              <h5>预定须知</h5>
              <p class="section-contant">中国天使投资协会是由维护会员合法权使投定的投资机制，寻求合理的投资方式，为天使投资人打造坚实的投资平台，让天使投</p>
            </section>


        </Card>
    </div>
</template>

<script>
export default {
  name: "CarouseManage",
  data() {
    return {
      theme: this.$store.state.app.themeColor,
      columns1: [
        {
          title: "线路名称",
          key: "line_name"
        },
        {
          title: "线路类型",
          key: "line_object"
        },
        {
          title: "产品性质",
          key: "product_nature"
        },
        {
          title: "旅行社名称",
          key: "travel_name"
        },
        {
          title: "出发城市",
          key: "start_city"
        },
        {
          title: "线路价格",
          key: "price"
        },
        {
          title: "发团日期",
          key: "start_date"
        },
        {
          title: "指定时间段",
          key: "time"
        }
      ],
      data1: [
        {
          line_name: "大西洋号东莞出发深圳往返",
          line_object: "国内游",
          product_nature: "跟团游",
          travel_name: "四川省中国青年旅行社少城分社",
          start_city: "香港九龙",
          price: "成人价：¥ 888.00 儿童价：¥ 888.00",
          start_date: "天天发团",
          time: "开始时间：2017-08-23"
        }
      ],
      formValidate: {
        account: "",
        travelname: ""
      },
      ruleValidate: {
        account: [
          {
            required: true,
            message: "The account cannot be empty",
            trigger: "blur"
          }
        ],
        travelname: [
          {
            required: true,
            message: "The account cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.line-detail {
  font-size: 12px;
  line-height: 48px;
}
.section-contant {
  padding: 16px;
  border: 1px solid rgb(233, 234, 236);
  font-size: 12px;
  line-height: 24px;
}
h5 {
  font-size: 14px;
  line-height: 48px;
}
section {
  margin-top: 48px;
}
// 自定义table
.title {
  font-size: 12px;
  line-height: 48px;
}
.detail-table1 {
    width: 100%;
    border: 1px solid rgb(233, 234, 236);
    th {
        border: 1px solid rgb(233, 234, 236);   
        font-size: 12px;
        font-weight: normal;
        line-height: 48px;
        width: 25%;
        color: rgb(73, 80, 96);
        padding-left: 16px;
    }

    tr:nth-child(2n+1) {
        background-color: #f8f8f9
    }


}
.detail-table2 {
    width: 100%;
    border: 1px solid rgb(233, 234, 236);
    border-top-color: transparent;
    font-size: 12px;
    line-height: 48px;
    th, td {
        border: 1px solid rgb(233, 234, 236);   
        font-size: 12px;
        font-weight: normal;
        line-height: 48px;
        width: 25%;
        color: rgb(73, 80, 96);
        padding-left: 16px;
    };
    th {
        background-color: #f8f8f9  
    }
    th:nth-child(1) {
        width: 20%;
    };
    th:nth-child(2) {
        width: 40%;
    };
    th:nth-child(3) {
        width: 60%;
    }
}
</style>
