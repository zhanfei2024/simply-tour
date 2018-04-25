<template>
  <div class="login-container container auth-container">
    <div class="login-bg">
      <img src="../../../assets/images/login_bg.png" class="bg_img" v-if="$route.params.name === 'merchant'">
      <img src="../../../assets/images/user_login_bg.png" class="bg_img" v-if="$route.params.name === 'customer'">
      <div class="login-form">
        <h1 class="auth-title" v-if="$route.params.name === 'merchant'">旅行社登录</h1>
        <h1 class="auth-title" v-if="$route.params.name === 'customer'">用戶登錄</h1>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem prop="phone">
            <Input v-model="formValidate.phone" placeholder="請輸入手機號碼"></Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="請輸入登錄密碼"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="loading" class="login-submit" @click="handleSubmit('formValidate')">
              <span v-if="!loading">馬上進入</span>
              <span v-else>Loading...</span>
            </Button>
          </FormItem>
          <div class="login-router">
            <router-link :to="{ name: '忘記密碼', params: { name: $route.params.name }}">
              忘記登錄密碼？
            </router-link>
            <router-link class="pull-right" :to="{ name: '賬號註冊', params: { name: $route.params.name }}">
              新用戶註冊
            </router-link>
          </div>
        </Form>
      </div>
      <div class="logon-bg2">
        <img src="../../../assets/images/login_bg2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import ICol from "iview/src/components/grid/col";

  export default {
    components: {ICol},
    data() {
      return {
        loading: false,
        formValidate: {
          phone: '',
          password: '',
        },
        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
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
            this.login();
            this.loading = false;
            this.$router.go(-1);
          } else {
            this.$Message.error('請填寫完整信息!');
            this.loading = false;
          }
        })
      },
      login() {
        const name = this.$route.params.name;
        this.$http.post(`${name}/auth/sign_in`, this.formValidate).then(res => {
          this.$Message.success('登錄成功!');
          sessionStorage.setItem('access_token', res.data.result.accessToken);
          sessionStorage.setItem('token_type', res.data.result.tokenType);
          sessionStorage.setItem('phone', this.formValidate.phone);
          sessionStorage.setItem('role', name);
          this.getTravel();
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      // 商家资料
      getTravel(){
        this.$http.get(`merchant/travel/self`).then(res => {
          this.travel = res.data.result;
          sessionStorage.setItem('travelStatus', this.travel.status);
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
    }
  }
</script>
