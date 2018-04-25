<template>
  <div class="container auth-container">
    <h1 class="auth-title text-center">重置密码</h1>
    <div class="security-post-page auth-step-page">
      <div class="steps">
        <div class="step" :class="{'step-active': current === 0}">
          <span class="circle-point">1</span>
          <span class="step-text">填写手机号</span>
        </div>
        <div class="step" :class="{'step-active': current === 1}">
          <span class="circle-point">2</span>
          <span class="step-text">验证身份</span>
        </div>
        <div class="step" :class="{'step-active': current === 2}">
          <span class="circle-point">3</span>
          <span class="step-text">设置新密码</span>
        </div>
        <div class="step" :class="{'step-active': current === 3}">
          <span class="circle-point">3</span>
          <span class="step-text">完成</span>
        </div>
      </div>
    </div>
    <div class="auth-password">
      <Row>
        <i-col span="6" offset="10">
          <Form ref="current1" :rules="ruleValidate" :model="current1" label-position="left"
                v-show="current === 0">
            <div>
              <FormItem prop="phone">
                <Input v-model="current1.phone" placeholder="請輸入手機號碼"></Input>
              </FormItem>
              <FormItem prop="code">
                <Input v-model="current1.code" placeholder="请输入验证码"></Input>
              </FormItem>
              <FormItem>
                <span class="auth-captcha">{{captcha}}</span>
                <span class="order-link">
                  <a @click="createCode()" style="margin-top: 0">看不清？换一张</a>
                </span>
              </FormItem>
              <FormItem>
                <Button type="primary" class="auth-submit" @click="next('current1')">下一步</Button>
              </FormItem>
            </div>
          </Form>
        </i-col>
      </Row>
      <Row>
        <i-col span="6" offset="10">
          <Form ref="current2" :rules="ruleValidate" :model="current2" label-position="left"
                v-show="current === 1">
            <div>
              <FormItem prop="phone">
                <Input v-model="current2.phone" disabled></Input>
              </FormItem>
              <FormItem prop="phoneCode" class="verification-content">
                <Input v-model="current2.phoneCode" placeholder="短信验证码"></Input>
                <span class="order-link verification">
                  <a class="hvr-underline-from-left" @click="getVerification(current2.phone)" :disabled="!timePromise">
                  {{paracont}}
                  </a>
                </span>
              </FormItem>
              <FormItem>
                <Button type="primary" class="auth-submit" @click="next('current2')">下一步</Button>
              </FormItem>
            </div>

          </Form>
        </i-col>
      </Row>
      <Row>
        <i-col span="6" offset="10">
          <Form ref="current3" :rules="ruleValidate" :model="current3" label-position="left"
                v-show="current === 2">
            <div>
              <FormItem prop="password">
                <Input v-model="current3.password" type="password" placeholder="设置6至20位登录密码"></Input>
              </FormItem>
              <FormItem prop="confirmPassword">
                <Input v-model="current3.confirmPassword" type="password" placeholder="请再次输入登录密码"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" class="auth-submit" @click="next('current3')">下一步</Button>
              </FormItem>
            </div>
          </Form>
        </i-col>
      </Row>
      <Row>
        <i-col span="6" offset="10">
          <div v-show="current === 3" class="text-center forget-password-success">
            <Icon type="ios-checkmark-outline" size="140"></Icon>
            <h2>密码重置成功</h2>
            <p>请使用新密码进行登录</p>
            <Button type="primary" class="auth-submit">
              <router-link :to="{ name: '賬號登錄', params: { name: $route.params.name }}">马上登录</router-link>
            </Button>
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
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入密碼'));
        } else {
          if (this.current3.confirmPassword !== '') {
            // 对第二个密码框单独验证
            this.$refs.current3.validateField('confirmPassword');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.current3.password) {
          callback(new Error('两个输入密码不匹配!'));
        } else {
          callback();
        }
      };
      const validateCodeCheck = (rule, value, callback) => {
        if (value !== this.captcha) {
          callback(new Error('請輸入正確的驗證碼!'));
        } else {
          callback();
        }
      };
      return {
        timePromise: true,
        paracont: '獲取驗證碼',
        loading: false,
        current: 0,
        second: '',
        captcha: '',
        current1: {
          phone: '',
          code: '',
        },
        current2: {
          phone: '',
          phoneCode: '',
        },
        current3: {
          password: '',
          confirmPassword: '',
        },

        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          code: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
            {validator: validateCodeCheck, trigger: 'blur'},
          ],
          phoneCode: [
            {required: true, message: "请输入验证码", trigger: 'blur'}
          ],
          password: [
            {type: 'string', min: 8, message: '密碼最小長度必須為8位', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.createCode();
    },
    methods: {
      next(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.current == 3) {
              this.current = 0;
            }
            if (name === 'current1') {
              this.current = 1;
              this.current2.phone = this.current1.phone;
            }
            if (name === 'current2') {
              this.checkCode();
            }
            if (name === 'current3') {
              this.resetPassword();
            }
          } else {
            this.$Message.error('请输入完整信息!');
          }
        })
      },
      createCode() {
        this.captcha = '';
        let codeLength = 6;//验证码的长度
        let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
        for (let i = 0; i < codeLength; i++) {//循环操作
          let index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
          this.captcha += random[index];//根据索引取得随机数加到code上
        }
      },
      getVerification(phone) {
        let regExp = /^(\d{8}|\d{11})$/;
        if (regExp.test(phone)) {
          this.verification();
          this.getCode();
        } else {
          this.paracont = "請輸入有效的手機號碼"
        }
      },
      verification() {
        this.second = 59;
        let time = setInterval(() => {
          if (this.second <= 0) {
            clearInterval(time);
            this.second = 59;
            this.paracont = "重發驗證碼"
            this.timePromise = true;
          } else {
            this.paracont = this.second + "秒後可重發";
            this.second--;
            this.timePromise = false;
          }
        }, 1000, 100);
      },
      //獲取驗證碼
      getCode() {
        this.$http.post(
          `${this.$route.params.name}/auth/get_code`,
          {phone: this.current2.phone},
        ).then(res => {
          this.$Message.success('發送成功請注意查收!');
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      checkCode() {
        this.$http.post(
          `${this.$route.params.name}/auth/check_code`,
          {phone: this.current2.phone, code: this.current2.phoneCode},
        ).then(res => {
          this.$Message.success('發送成功請注意查收!');
          this.current = 2;
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      resetPassword() {
        this.$http.post(
          `${this.$route.params.name}/auth/reset_password`,
          {
            phone: this.current2.phone,
            code: this.current2.phoneCode,
            password: this.current3.password
          },
        ).then(res => {
          this.$Message.success('修改成功!');
          this.current = 3;
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      }
    }
  }
</script>

<style scoped>

</style>
