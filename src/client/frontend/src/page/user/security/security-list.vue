<template>
  <div class="security">
    <header class="my-head">
      <h2>安全設置</h2>
    </header>
    <div class="security-body">
      <div class="security-item">
        <Row :gutter="20">
          <i-col span="2">
            <Icon type="ios-locked-outline" size="80"></Icon>
          </i-col>
          <i-col span="22">
            <h2 class="security-title">登录密码</h2>
            <p class="security-text">建议您定期更换密码，设置安全性高的密码可以使帐号更安全</p>
            <a class="routerLink hvr-underline-from-left" @click="modal8 = true">修改密碼</a>
          </i-col>
        </Row>
      </div>
      <div class="security-item">
        <Row :gutter="20">
          <i-col span="2">
            <Icon type="iphone" size="80" style="margin-left: 10px;"></Icon>
          </i-col>
          <i-col span="22">
            <h2 class="security-title">安全手机 186****5678</h2>
            <p class="security-text">安全手机可以用于登录帐号，重置密码或其他安全验证</p>
            <router-link to="/user/security-post">
              <a class="routerLink hvr-underline-from-left">更換手機號碼</a>
            </router-link>
          </i-col>
        </Row>
      </div>
    </div>


    <Modal v-model="modal8" width="400" :mask-closable="false">
      <p slot="header">
        <span>修改登录密码</span>
      </p>
      <Form ref="formTop" :rules="ruleValidate" :model="formTop" label-position="top">
        <FormItem prop="oldPassword">
          <Input type="password" v-model="formTop.oldPassword" placeholder="原密碼"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formTop.password" placeholder="新密碼"></Input>
        </FormItem>
        <FormItem prop="confirmPassword">
          <Input type="password" v-model="formTop.confirmPassword" placeholder="確認新密碼"></Input>
        </FormItem>
      </Form>


      <div slot="footer" style="margin-top: 38px">
        <Button type="primary" size="large" long :loading="loading">保存</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  export default {
    name: "security",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入密碼'));
        } else {
          if (this.formTop.confirmPassword !== '') {
            // 对第二个密码框单独验证
            this.$refs.formTop.validateField('confirmPassword');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formTop.password) {
          callback(new Error('两个输入密码不匹配!'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        modal8: false,
        formTop: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        ruleValidate: {
          oldPassword: [
            {type: 'string', min: 6, message: '密碼最小長度必須為6位', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          password: [
            {type: 'string', min: 6, message: '密碼最小長度必須為6位', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
