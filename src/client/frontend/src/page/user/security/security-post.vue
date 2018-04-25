<template>
  <div class="profile">
    <header class="my-head">
      <h2>更换手机号码</h2>
    </header>
    <div class="body security-post-page">
      <div class="steps">
        <div class="step" :class="{'step-active': current === 0}">
          <span class="circle-point">1</span>
          <span class="step-text">验证身份</span>
        </div>
        <div class="step" :class="{'step-active': current === 1}">
          <span class="circle-point">2</span>
          <span class="step-text">修改手机号码</span>
        </div>
        <div class="step" :class="{'step-active': current === 2}">
          <span class="circle-point">3</span>
          <span class="step-text">完成更换</span>
        </div>
      </div>

      <Row>
        <i-col span="8" offset="8">
          <div v-show="current === 0" class="step-content">
            <h1 class="binding-phone text-left">
              已绑定的手机：{{formRight.oldPhone}}
            </h1>
            <Form ref="formRight" :rules="ruleValidate" :model="formRight" label-position="left">
              <div>
                <FormItem prop="phoneCode" class="verification-content">
                  <Input v-model="formRight.oldCode" placeholder="短信验证码"></Input>
                  <span class="order-link verification">
                  <a class="hvr-underline-from-left" @click="getVerification(formRight.oldPhone,'old')"
                     :disabled="!timePromise">
                  {{paracont}}
                  </a>
                </span>
                </FormItem>
                <FormItem class="text-center">
                  <Button type="primary" class="auth-submit" @click="next('formRight')">下一步</Button>
                </FormItem>
              </div>

            </Form>

          </div>

          <div v-show="current === 1" class="step-content">
            <Form ref="form" :rules="ruleValidate" :model="form" label-position="left">
              <div>
                <FormItem prop="phone">
                  <Input v-model="form.phone" placeholder="請輸入新的手機號碼"></Input>
                </FormItem>
                <FormItem prop="phoneCode" class="verification-content">
                  <Input v-model="form.code" placeholder="短信验证码"></Input>
                  <span class="order-link verification">
                  <a class="hvr-underline-from-left" @click="getVerification(form.phone,'new')" :disabled="!newTimePromise">
                  {{newParacont}}
                  </a>
                </span>
                </FormItem>
                <FormItem class="text-center">
                  <Button type="primary" class="auth-submit" @click="next('form')">下一步</Button>
                </FormItem>
              </div>

            </Form>

          </div>

        </i-col>
      </Row>
      <div v-show="current === 2" class="step-content">
        <div class="success-message text-center">
          <Icon type="ios-checkmark-outline"></Icon>
          <h1>手机号码更换成功</h1>
          <p>你可以在下次使用新号码登录</p>
        </div>
        <div class="form-button text-center">
          <Button type="primary" class="next-submit" v-show="current === 2" @click="next('')">
            <router-link class="form-back" to="/management/security-list">
              返回
            </router-link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timePromise: true,
        newTimePromise: true,
        current: 0,
        time: '',
        paracont: '獲取驗證碼',
        newParacont: '獲取驗證碼',
        form: {
          phone: '',
          code: ''
        },
        formRight: {
          oldCode: '',
          oldPhone: '',
        },
        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '請輸入驗證碼', trigger: 'blur'},
            {min: 6, message: '驗證碼長度最小長度為6位', trigger: 'blur'},
          ],
          oldCode: [
            {required: true, min: 6, message: '驗證碼長度最小長度為6位', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      this.formRight.oldPhone = sessionStorage.getItem('phone')
    },
    methods: {
      next(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.current == 3) {
              this.current = 0;
            }
            if (name === 'formRight') {
              this.checkCode('old', {phone: this.formRight.oldPhone, code: this.formRight.oldCode});
            }
            if (name === 'form') {
              this.checkCode('news', {phone: this.form.phone, code: this.form.code});
            }
            if (name === 'current3') {
              this.resetPassword();
            }
          } else {
            this.$Message.error('请输入完整信息!');
          }
        })
      },
      getVerification(phone,type) {
        let regExp = /^(\d{8}|\d{11})$/;
        if (regExp.test(phone)) {
          this.verification(type);
          this.getCode(phone);
        } else {
          this.paracont = "請輸入有效的手機號碼"
        }
      },
      verification(type) {
        this.second = 59;
        if(type === 'old'){
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
        }else{
          let time = setInterval(() => {
            if (this.second <= 0) {
              clearInterval(time);
              this.second = 59;
              this.newParacont = "重發驗證碼"
              this.newTimePromise = true;
            } else {
              this.newParacont = this.second + "秒後可重發";
              this.second--;
              this.newTimePromise = false;
            }
          }, 1000, 100);

        }
      },
      //獲取驗證碼
      getCode(phone) {
        this.$http.post(
          `customer/auth/get_code`,
          {phone: phone},
        ).then(res => {
          this.$Message.success('發送成功請注意查收!');
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      checkCode(type, data) {
        this.$http.post(
          `customer/auth/check_code`,
          data,
        ).then(res => {
          this.$Message.success('發送成功請注意查收!');
          if (type === 'old') {
            this.current = 1;
          } else {
            this.bindingPhone();
          }
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      bindingPhone() {
        this.$http.post(
          `customer/auth/change_binding_phone`,
          {phone: this.form.phone, code: this.form.code},
        ).then(res => {
          this.$Message.success('解綁成功!');
          this.current = 2;
          this.timePromise = true;
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      }
    }
  }
</script>

