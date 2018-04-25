<template>
  <div class="container">
    <div class="auth-container">
      <Row>
        <h1 class="auth-title text-center">新用户注册</h1>

        <i-col span="8" offset="8">
          <Form ref="formTop" :model="formTop" :rules="ruleValidate" label-position="top">
            <FormItem prop="phone">
              <Input v-model="formTop.phone" placeholder="输入手机号码"></Input>
            </FormItem>
            <FormItem prop="code" class="verification-content">
              <Input v-model="formTop.code" placeholder="短信验证码"></Input>
              <span class="order-link verification">
                  <a class="hvr-underline-from-left" @click="getVerification(formTop.phone)" :disabled="!timePromise">
                  {{paracont}}
                  </a>
                </span>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formTop.password" placeholder="设置6至20位登录密码"></Input>
            </FormItem>
            <p class="text-center">
              <Icon type="ios-checkmark-outline" size="20"></Icon>
              <span class="read-text">已阅读并同意</span>
              <span>《用户服务协议》</span>
            </p>
            <FormItem class="text-center">
              <Button type="primary" class="auth-submit" :loading="loading"
                      @click="handleSubmit('formTop')">
                <span v-if="!loading">马上进入</span>
                <span v-else>Loading...</span>
              </Button>
            </FormItem>
            <p class="text-center auth-link">
              <router-link to="/auth/login/user">
                已有账号？立即登录
              </router-link>
            </p>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        timePromise: true,
        paracont: '獲取驗證碼',
        formTop: {
          phone: '',
          code: '',
          password: '',
        },
        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],

          code: [
            {required: true, message: '請輸入驗證碼', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '請輸入密碼', trigger: 'blur'},
            {type: 'string', min: 6, message: '密碼最小長度必須為6位', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      handleSubmit(name) {
        this.loading = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.register();
            if (this.$route.params.name === 'merchant') {
              this.$router.push('/auth/settled')
            } else {
              this.$router.push('/')
            }
            this.loading = false;
          } else {
            this.$Message.error('Fail!');
            this.loading = false;
          }
        })
      },
      //註冊
      register() {
        this.$http.post(`${this.$route.params.name}/auth/register`, this.formTop).then(res => {
          sessionStorage.setItem('access_token', res.data.result.accessToken);
          sessionStorage.setItem('token_type', res.data.result.tokenType);
          sessionStorage.setItem('phone', this.formTop.phone);
          sessionStorage.setItem('role', this.$route.params.name);
          this.$Message.success('註冊成功!');
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });;
      },
      //獲取驗證碼
      getVerification(phone) {
        let regExp = /^(\d{8}|\d{11})$/;
        if (regExp.test(phone)) {
          this.verification();
          this.getCode();
        } else {
          this.paracont = "請輸入有效的手機號碼"
        }
      },
      //驗證碼驗證
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
          {phone: this.formTop.phone},
        ).then(res=>{
          this.$Message.success('發送成功請注意查收!');
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });;
      }

    }
  }
</script>

<style scoped>

</style>
