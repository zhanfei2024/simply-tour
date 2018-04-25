<template>
  <div class="line-post-contaier">
    <div class="order-status-step text-center">
      <Row type="flex" justify="space-around" class="code-row-bg">
        <i-col span="4">
          <p class="step-name active"><span class="step-number">1</span> 基本信息</p>
        </i-col>
        <i-col span="4">
          <p class="step-name"><span class="step-number">2</span> 詳情描述</p>
        </i-col>
        <i-col span="4">
          <p class="step-name"><span class="step-number">3</span> 發佈成功</p>
        </i-col>
      </Row>
    </div>
    <!--基本信息-->
    <div class="line-post-profile" v-show="current === 0">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
        <Row>
          <i-col span="12">
            <FormItem prop="title">
              <Input v-model="formValidate.title" placeholder="请输入标题，最多可输入35个字"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="6">
            <FormItem label="線路類型" prop="type">
              <RadioGroup v-model="formValidate.type">
                <Radio label="male" class="radio">國內游</Radio>
                <Radio label="female" class="radio">境外游</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="產品性質" prop="nature">
              <RadioGroup v-model="formValidate.nature">
                <Radio label="male" class="radio">跟團游</Radio>
                <Radio label="female" class="radio">自助遊</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </Row>
        <FormItem>
          <div class="line-upload">
            <span class="img-label">线路图片 <span class="more-img">最多上傳5張</span></span>
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
          </div>
        </FormItem>
        <FormItem label="出發城市" prop="city">
          <Row>
            <i-col span="7">
              <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="目的地 （ 目的地最多添加5个 ）" prop="objective">
          <Button type="primary" class="evaluate-post-submit add-objective-btn">
            添加目的地
          </Button>
        </FormItem>
        <div class="select-objective">
           <ul class="select-objective-content">
             <li class="item">
                <span>廣州 - 香港 x</span>
             </li>
             <li class="item">
               <span>廣州 - 香港 x</span>
             </li>
             <li class="item">
               <span>廣州 - 香港 x</span>
             </li>
           </ul>
        </div>
        <div class="line-post-price">
          <FormItem label="線路價格">
            <i-col span="6">
              <FormItem  prop="adultPrice">
                <Input v-model="formValidate.adultPrice" placeholder="成人价格"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem  prop="childPrice" class="margin-left-20">
                <Input v-model="formValidate.childPrice" placeholder="兒童价格"></Input>
              </FormItem>
            </i-col>
          </FormItem>
        </div>

        <FormItem prop="startDate">
          <span class="ivu-form-item-label">
            發團日期
            <span class="label-text">（ 如果是星期一发团，勾选星期一即可，如果是每天发团，那么不用选择 ）</span>
          </span>
          <CheckboxGroup v-model="formValidate.startDate">
            <Checkbox label="星期一" class="radio"></Checkbox>
            <Checkbox label="星期二" class="radio"></Checkbox>
            <Checkbox label="星期三" class="radio"></Checkbox>
            <Checkbox label="星期四" class="radio"></Checkbox>
            <Checkbox label="星期五" class="radio"></Checkbox>
            <Checkbox label="星期六" class="radio"></Checkbox>
            <Checkbox label="星期天" class="radio"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="指定時間段" prop="time">
          <Row>
            <i-col span="6">
              <DatePicker type="date" style="width: 100%" placeholder="請選擇開始時間" v-model="formValidate.date"></DatePicker>
            </i-col>
            <i-col span="6" class="margin-left-20">
              <DatePicker type="date" style="width: 100%" placeholder="請選擇開始時間" v-model="formValidate.date"></DatePicker>
            </i-col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" class="line-post-submit" :loading="loading" @click="handleSubmit('formValidate')">
            <span v-if="!loading">下一步</span>
            <span v-else>Loading...</span>
          </Button>
        </FormItem>
      </Form>

    </div>
    <!--詳情描述-->
    <Form ref="lineForm" v-model="lineForm" :rules="lineValidate" v-show="current ===1">
      <FormItem  prop="description">
        <h4 class="label-title">線路特色</h4>
        <quill-editor v-model="lineForm.description"
                      :options="editorOption">
        </quill-editor>
      </FormItem>
      <FormItem prop="reference">

        <span class="label-title">線路特色</span>
        <Button type="primary" @click="lineForm.reference = 'content'" class="hvr-sweep-to-right profile-submit reference-btn">
          <span>按行程内容排序</span>
        </Button>
        <Button type="primary" @click="lineForm.reference = 'date'" class="hvr-sweep-to-right reference-btn default-bg">
          <span>按时间顺序排序</span>
        </Button>
      </FormItem>
      <FormItem v-if="lineForm.reference === 'content'">
        <quill-editor v-model="lineForm.arrange"
                      :options="editorOption">
        </quill-editor>
      </FormItem>
      <!--按时间顺序排序-->
      <div v-else style="overflow: hidden">
        <Row>
          <i-col span="6">
            <FormItem label="行程天数" prop="day">
              <Select v-model="lineForm.day" placeholder="Select your city">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6" style="margin-left: 20px">
            <FormItem label="行程天数" prop="night">
              <Select v-model="lineForm.night" placeholder="Select your city">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <div class="post-border"></div>

        <div class="line-post-date-item" v-show="lineForm.day > 0" v-for="(item,index) in trip">
          <h2 class="day-title">第{{index+1}}天</h2>
          <FormItem label="線路標題" prop="title">
            <Input v-model="item.title" placeholder="请输入标题，最多可输入35个字"></Input>
          </FormItem>
          <FormItem label="行程安排" prop="title">
            <Input v-model="trip.content"  type="textarea"  placeholder="请输入标题，最多可输入35个字"></Input>
          </FormItem>
          <FormItem>
            <h4 class="label-title">用食</h4>
            <Row>
              <div class="clearfix meals-content">
                <i-col span="2">
                  <CheckboxGroup v-model="item.meals">
                    <Checkbox label="早餐"></Checkbox>
                  </CheckboxGroup>
                </i-col>
                <i-col span="22">
                  <FormItem>
                    <Input v-model="item.title" placeholder="请输入早餐信息，最多可输入35个字"></Input>
                  </FormItem>
                </i-col>
              </div>
              <div class="clearfix meals-content">
                <i-col span="2">
                  <CheckboxGroup v-model="item.meals">
                    <Checkbox label="早餐"></Checkbox>

                  </CheckboxGroup>
                </i-col>
                <i-col span="22">
                  <FormItem>
                    <Input v-model="item.title" placeholder="请输入早餐信息，最多可输入35个字"></Input>
                  </FormItem>
                </i-col>
              </div>
              <div class="clearfix meals-content">
                <i-col span="2">
                  <CheckboxGroup v-model="item.meals">
                    <Checkbox label="早餐"></Checkbox>

                  </CheckboxGroup>
                </i-col>
                <i-col span="22">
                  <FormItem>
                    <Input v-model="item.title" placeholder="请输入早餐信息，最多可输入35个字"></Input>
                  </FormItem>
                </i-col>
              </div>
            </Row>
          </FormItem>

          <FormItem>
            <h4 class="label-title">住宿</h4>
            <div class="clearfix meals-content">
              <i-col span="2">
                <CheckboxGroup v-model="item.live">
                  <Checkbox label="住宿"></Checkbox>
                </CheckboxGroup>
              </i-col>
              <i-col span="22">
                <FormItem>
                  <Input v-model="item.title" placeholder="请输入早餐信息，最多可输入35个字"></Input>
                </FormItem>
              </i-col>
            </div>
          </FormItem>

          <FormItem>
            <h4 class="label-title">交通</h4>
            <div class="clearfix meals-content">
              <i-col span="2">
                <CheckboxGroup v-model="item.traffic">
                  <Checkbox label="交通"></Checkbox>
                </CheckboxGroup>
              </i-col>
              <i-col span="22">
                <FormItem>
                  <Input v-model="item.title" placeholder="请输入早餐信息，最多可输入35个字"></Input>
                </FormItem>
              </i-col>
            </div>
          </FormItem>
        </div>
      </div>

      <!--費用說明-->
      <FormItem prop="cost">
        <h4 class="label-title">費用說明</h4>
        <quill-editor v-model="lineForm.cost"
                      :options="editorOption">
        </quill-editor>
      </FormItem>
      <FormItem>
        <h4 class="label-title">預定須知</h4>
        <quill-editor v-model="lineForm.reservation"
                      :options="editorOption">
        </quill-editor>
      </FormItem>

    </Form>

    <!--發佈成功-->
    <div v-show="current === 2" class="text-center post-success">
      <Icon type="ios-checkmark-outline" size="60"></Icon>
      <h1 class="post-success-title">线路发布成功</h1>
      <p class="post-success-text">预计24小时内完成审核，请耐心等待</p>
      <div>
        <Button type="primary" class="hvr-sweep-to-right success-submit">
          <span>繼續發佈</span>
        </Button>
      </div>
      <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/5/order/1/details`">預覽線路</router-link>
      </span>
      <span class="order-link">
                      <router-link class="hvr-underline-from-left" :to="`/5/order/1/details`">返回</router-link>
      </span>
    </div>
  </div>
</template>

<script>
  import ICol from "iview/src/components/grid/col";

  export default {
    components: {ICol},
    data() {
      return {
        current: 0,
        loading: false,
        editorOption: {},
        formValidate: {
          title: '',
          type: '',
          nature: '',
          city: '',
          objective: [],
          adultPrice: 0,
          childPrice: 0,
          startDate: [],
          time: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '線路標題不能為空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '請選擇線路類型', trigger: 'blur'},
          ],
          nature: [
            {required: true, message: '請選擇產品性質', trigger: 'change'}
          ],
          city: [
            {required: true, message: '請選擇出發城市', trigger: 'change'}
          ],
          // objective: [
          //   {required: true, type: 'array', min: 1, message: '請添加目的地', trigger: 'change'},
          //   {type: 'array', max: 10, message: '目的地最多添加十个', trigger: 'change'}
          // ],
          adultPrice: [
            {required: true, message: '請輸入成人價格'}
          ],
          childPrice: [
            {required: true, message: '請輸入兒童價格'}
          ],
          startDate: [
            {required: true, type: 'array', min: 1, message: '請選擇發團日期', trigger: 'change'},
            {type: 'array', max: 5, message: '發團時間添加5个', trigger: 'change'}
          ],
          // time: [
          //   {required: true, message: '請選擇指定時間段'}
          // ]
        },
        lineForm: {
          description: '',
          reference: 'content',
          cost: '',
          reservation: "",
          arrange: "",
          day: 0,
          night: 0,
          trip: []
        },
        lineValidate: {
          description: {required: true, message: '線路特色不能為空', trigger: 'blur'},
          reference: {required: true, message: '請選擇參考行程', trigger: 'chang'},
          cost: {required: true, message: '請輸入費用說明', trigger: 'chang'},
        }
      }
    },
    created() {
      this.$watch(
        () => {
          return this.lineForm.day
        },
        (newVal) => {
          // 做点什么
          this.orderNumber(newVal);
        }
      )
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            if (this.current == 3) {
              this.current = 0;
            } else {
              this.current += 1;
            }
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      orderNumber(number) {
        this.trip = [];
        for (let i = 0; i < number; i++) {
          this.trip.push(
            {
              title: '',
              content: '',
              meals: [],
              live: [],
              traffic: [],
            },
          )
        }
      }
    }
  }
</script>

<style scoped>

</style>
