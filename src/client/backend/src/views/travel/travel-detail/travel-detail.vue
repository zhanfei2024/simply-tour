<template>
    <div class="enter-manage home-table">
        <Card  class="margin-bottom-20">
            <p slot="title">
                用户信息
            </p>
            <a href="#" slot="extra">
                <Button class="pull-right">不通过</Button>
                <Button class="pull-right" style="margin-right: 20px" type="primary">通过</Button>
            </a>
            <table class="detail-table1">
                <tr>
                    <th>账户</th>
                    <th>187777777</th>
                    <th>旅行社名称</th>
                    <th>四川省中国青年旅行社少城分社</th>
                </tr>
                <tr>
                    <th>联系人</th>
                    <th>张德彪</th>
                    <th>联系电话</th>
                    <th>111111111</th>
                </tr>
                <tr>
                    <th>所在地</th>
                    <th>香港九龙</th>
                    <th>地址</th>
                    <th>四川省中国青年旅行社少城分社</th>
                </tr>
                <tr>
                    <th>账户</th>
                    <th>187777777</th>
                    <th>旅行社名称</th>
                    <th>四川省中国青年旅行社少城分社</th>
                </tr>
            </table>
            <table class="detail-table2">
                <tr>
                    <th>图片</th>
                    <th>图片详情</th>
                    <th>简介</th>
                </tr>
                <tr>
                    <td>旅行社logo</td>
                    <td>图片</td>
                    <td rowspan="8">中国天使投资协会是由中国万通国际集团股份有限公司牵头，多家投行、天使投资人共同发起并组建，经香港警务署审核， 于2012年在香港特区批准成立的非盈利性国际社会团体。 中国天使投资协会自成立以来，始终秉承“爱国、利民、真诚、奉献”的核心文化理念；倡导“促进行业环境建设，建立自立监管机构，维护会员合法权益，研究行业发展动向”的宗旨；肩负天使投资在中国发扬光大的重大使命。中国天使投资协会旨在搭建一个交流、共赢、研究发展平台，致力于建立稳定的投资机制，寻求合理的投资方式，为天使投资人打造坚实
                        的投资平台，让天使投资以高速、健康的形式蓬勃发展。相信随着天使投资产业的不断壮大，中国建设创新型社会的步伐会越来越快!</td>
                </tr>
                <tr>
                    <td>旅行社logo</td>
                    <td>图片</td>
                </tr>
            </table>

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
// 自定义table
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
    tr {
        th:nth-child(2n+1) {
            background-color: #f8f8f9
        }
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
