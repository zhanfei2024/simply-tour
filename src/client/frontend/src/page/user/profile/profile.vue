<template>
  <div class="profile">
    <header class="my-head">
      <h2>个人信息</h2>
    </header>
    <div class="profile-body">
      <Row>
        <i-col span="8" offset="8">
          <Form ref="formRight" :rules="ruleValidate" :model="formRight" label-position="top">
            <FormItem prop="phone">
              <Input v-model="formRight.phone" placeholder="请输入手机号码"></Input>
            </FormItem>
            <FormItem prop="gender">
              <span class="text"><Button class="active" type="ghost" @click="formRight.gender = 'F'">男</Button></span>
              <span class="text"><Button class="margin-left" type="ghost" @click="formRight.gender = 'M'">女</Button></span>
            </FormItem>
            <FormItem prop="birth">
              <DatePicker type="date" v-model="formRight.birth" placeholder="请选择出身日期"
                          style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem prop="name">
              <Input v-model="formRight.name" placeholder="请填写真实姓名"></Input>
            </FormItem>
            <FormItem prop="idNumber">
              <Input v-model="formRight.idNumber" placeholder="请填写身份证号码"></Input>
            </FormItem>
            <FormItem prop="email">
              <Input v-model="formRight.email" placeholder="请填写电子邮箱"></Input>
            </FormItem>
            <FormItem class="text-center">
              <Button type="primary" @click="handleSubmit('formRight')" :loading="loading" class="hvr-sweep-to-right profile-submit">
                <span v-if="!loading">提交</span>
                <span v-else>Loading...</span>
              </Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "profile",
    data() {
      return {
        loading: false,
        formRight: {
          phone: '',
          birth: '',
          gender: '',
          animal: '男',
          name: "",
          idNumber: '',
          email: ''
        },
        ruleValidate: {
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          gender: [
            {required: true, message: '請選擇性別', trigger: 'blur'},
          ],
          birth: [
            {required: true, message: '請選擇出生日期', trigger: 'blur'},
          ],
          idNumber: [
            {required: true, message: '請輸入身份證號碼', trigger: 'blur'},
          ],
          email: [
            {type: 'email', required: true, message: '請輸入電子郵箱', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '請輸入真实姓名', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.loading = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.submit();
            this.$Message.success('Success!');
            this.loading = false;
          } else {
            this.$Message.error('Fail!');
            this.loading = false;
          }
        })
      },
      submit() {
        this.$http.post('user/profile', this.formRight).then(res => {

        }, res => {

        });
      }
    }
  }
</script>

<style scoped>

</style>
