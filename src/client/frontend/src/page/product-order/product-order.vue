<template>
  <div class="container">
    <div class="product-detail-order">
      <h1 class="order-title">填写订单信息</h1>
      <Row>
        <i-col span="24">
          <Row>
            <div class="product-detail-order-profiles clearfix">
              <i-col span="18">
                <div class="product-detail-order-profiles-left">
                  <h2 class="title">产品信息</h2>
                  <div class="content">
                    <p>线路名称 : <span class="text">乐享奢华普吉6天5晚【1晚甲米+2晚海边+2晚别墅】 [成都出发]</span></p>
                    <p class="product-type">产品类型 :
                      <!--<Button type="ghost">{{$store?.state?.productDetails?.selectType?.name}}</Button>-->
                      <span class="text"><Button class="active" type="ghost">跟团游</Button></span>
                    </p>
                    <p>出发日期 : <span class="text">2018-11-17(星期二){{formLeft.startDate}}</span></p>
                    <div class="product-type">
                      <span class="name">出游人数：</span>
                      <span class="adultsNumber">
                      <span @click="selectNumber('delete','adults')"><Icon type="ios-minus-outline"
                                                                           size="20"></Icon></span>
                       <span class="text">成人/</span>
                       <InputNumber :max="10" :min="1" v-model="formLeft.adultsNumber"></InputNumber>
                      <span @click="selectNumber('add','adults')"><Icon type="ios-plus-outline" size="20"></Icon></span>
                     </span>
                      <span class="adultsNumber">
                      <span @click="selectNumber('delete','child')"><Icon type="ios-minus-outline"
                                                                          size="20"></Icon></span>
                      <span class="text">儿童/</span>
                      <InputNumber :max="10" :min="1" v-model="formLeft.childNumber"></InputNumber>
                      <span @click="selectNumber('add','child')"><Icon type="ios-plus-outline" size="20"></Icon></span>
                    </span>
                    </div>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <div class="product-detail-order-profiles-right">
                  <h1 class="title">订单信息</h1>
                  <div class="content">
                    <p>
                      <span class="text">订单金额</span>
                      <span class="pull-right">¥1800.00</span>
                    </p>
                    <p v-if="formLeft.adultsNumber">
                      <span class="text">成人</span>
                      <span class="pull-right">{{formLeft.adultsNumber}} x ￥{{adultsPrice}}</span>
                    </p>
                    <p v-if="formLeft.childNumber > 0">
                      <span class="text">儿童</span>
                      <span class="pull-right">{{formLeft.childNumber}} x ￥{{childPrice}}</span>
                    </p>
                  </div>
                  <p>
                    <span style="font-size: 16px">费用合计</span>
                    <span class="totals pull-right">¥{{totals}}</span>
                  </p>
                </div>
              </i-col>
            </div>

          </Row>


          <Row>
            <div class="product-detail-order-contact clearfix">
              <h2 class="title">联系人信息 <span class="text">(请务必确保以下联系方式准确及畅通，便于接收行程通知与确认信息)</span></h2>
              <i-col span="6">
                <Form ref="formLeft" :rules="ruleValidate" :model="formLeft">
                  <FormItem prop="contact">
                    <Input v-model="formLeft.contact" placeholder="请填写真实姓名"></Input>
                  </FormItem>
                  <FormItem prop="phone">
                    <Input v-model="formLeft.phone" placeholder="手机号码"></Input>
                  </FormItem>
                </Form>
              </i-col>
            </div>
          </Row>

          <div class="product-detail-order-contact clearfix">
            <h2 class="title">出行人信息 <span class="text">(为了确保您顺利出行，请务必仔细填写出行人的信息，避免因信息错误耽误您的旅行)</span></h2>
            <Row>
              <div class="traveling-content" v-for="(item,index) in peopleTravel">
                <i-col span="24">
                  <div class="traveling-item">
                    <Form ref="item" :rules="peopleTravelValidate" :model="item" label-position="left">
                      <h1 class="traveling-title">
                        <Icon type="ios-person-outline" size="25"></Icon>
                        第{{index +1}}位出行人
                      </h1>
                      <i-col span="6">
                        <FormItem prop="contact" class="margin-right-10">
                          <Input v-model="item.contact" placeholder="请填写真实姓名"></Input>
                        </FormItem>
                      </i-col>
                       <i-col span="6">
                         <FormItem prop="idType" class="margin-right-10">
                           <Input v-model="item.idType" placeholder="请输入证件类型"></Input>
                         </FormItem>
                       </i-col>
                      <i-col span="6">
                        <FormItem prop="idNumber" class="margin-right-10">
                          <Input v-model="item.idNumber" placeholder="请输入证件号码"></Input>
                        </FormItem>
                      </i-col>
                      <i-col span="6">
                        <FormItem>
                          <Input v-model="item.phone" placeholder="手机号码"></Input>
                        </FormItem>
                      </i-col>
                    </Form>
                  </div>
                </i-col>
              </div>
            </Row>
            <Row>
              <i-col span="24">
                <Button type="primary" class="order-submit" :loading="loading" @click="handleSubmit()">
                  <span v-if="!loading">确认提交订单</span>
                  <span v-else>Loading...</span>
                </Button>
              </i-col>
            </Row>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  import ICol from "iview/src/components/grid/col";

  export default {
    components: {ICol},
    data() {
      return {
        value1: 1,
        adultsPrice: 1800,
        childPrice: 1200,
        totals: 0,
        loading: false,
        formLeft: {
          contact: '',
          phone: '',
          startDate: '',
          childNumber: '',
          adultsNumber: '',
          productType: '',
          peopleTravel: []
        },
        peopleTravel: [],
        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          contact: [
            {required: true, message: '請輸入聯繫人', trigger: 'blur'},
          ],
        },
        peopleTravelValidate: {
          phone: [
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          contact: [
            {required: true, message: '請輸入聯繫人', trigger: 'blur'},
          ],
          idType: [
            {required: true, message: '請輸入證件類型', trigger: 'blur'},
          ],
          idNumber: [
            {required: true, message: '請輸入證件號碼', trigger: 'blur'},
          ],
        }
      }
    },
    watch: {},
    created() {
      this.formLeft.startDate = this.$store.state.productDetails.startDate.getFullYear() + '-' + (this.$store.state.productDetails.startDate.getMonth() + 1) + '-' + this.$store.state.productDetails.startDate.getDate()
      this.formLeft.childNumber = this.$store.state.productDetails.childNumber;
      this.formLeft.adultsNumber = this.$store.state.productDetails.adultsNumber;
      this.formLeft.productType = this.$store.state.productDetails.selectType.id;
      this.orderNumber(this.formLeft.adultsNumber + this.formLeft.childNumber);
      this.total();
      this.$watch(
        () => {
          return this.formLeft.adultsNumber + this.formLeft.childNumber
        },
        (newVal) => {
          // 做点什么
          this.orderNumber(newVal);
          this.total();
        }
      )

    },

    methods: {
      orderNumber(number) {
        this.peopleTravel = [];
        for (let i = 0; i < number; i++) {
          this.peopleTravel.push(
            {
              contact: '',
              idType: '',
              idNumber: '',
              phone: ''
            },
          )
        }
      },
      total() {
        this.totals = this.formLeft.adultsNumber * this.adultsPrice + this.formLeft.childNumber * this.childPrice;
      },
      handleSubmit() {
        this.loading = true;
        this.$refs['formLeft'].validate((valid) => {
          if (valid) {
            this.$lodash.each(this.peopleTravel, (value, i) => {
              this.$refs['item'][i].validate((valids) => {
                this.$Message.success('Success!');
              })
            });
            this.loading = false;
          } else {
            this.$Message.error('Fail!');
            setTimeout(() => {
              this.loading = false;
            }, 1500)
          }
        })
      },
      selectNumber(type, name) {
        if (type === 'add' && name === 'adults') {
          this.formLeft.adultsNumber++;
        }
        if (type === 'delete' && name === 'adults' && this.product.adultsNumber !== 0) {
          this.formLeft.adultsNumber--;
        }
        if (type === 'add' && name === 'child') {
          console.log("#3333333333")
          this.formLeft.childNumber++;
        }
        if (type === 'delete' && name === 'child' && this.product.childNumber !== 0) {
          this.formLeft.childNumber--;
        }
      }


    }
  }
</script>

<style scoped>

</style>
