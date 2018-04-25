<template>
  <div class="page">

    <Row>
      <Col span="24">
      <Card class="account-card">
        <p slot="title">账户设置</p>
        <div class="account-content">
            <div class="demo-avatar">
            <Avatar icon="person" size="large" />
            </div>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem label="用户名" prop="name">
                <Input type="text" :disabled="true" v-model="formCustom.name" placeholder="Enter your user name"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
                <Input type="email" :disabled="true" v-model="formCustom.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="旧密码" prop="passwd">
                <Input type="password" v-model="formCustom.old_password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem label="新密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd" placeholder="Enter your new password"></Input>
            </FormItem>
            <FormItem label="确认新密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck" placeholder="Enter your new password again"></Input>
            </FormItem>
            <FormItem class="account-submit">
                <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            </FormItem>
            </Form>
        </div>
      </Card>
      </Col>
    </Row>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Account',
    data() {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your user name'));
            } else {
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
                        callback(new Error('Please input 4 to 16 bits (letters, numbers, underline, minus) combination of characters'));
                    } else {
                        callback();
                    }
                }, 300);
            }
        };
        const validateMail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your e-mail'));
            } else {
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
                        callback(new Error('Please enter the correct mailbox format'));
                    } else {
                        callback();
                    }
                }, 300);
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'));
            } else {
                callback();
            }
        };
        // const validateAge = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('Age cannot be empty'));
        //     }
        //     // 模拟异步验证效果
        //     setTimeout(() => {
        //         if (!Number.isInteger(value)) {
        //             callback(new Error('Please enter a numeric value'));
        //         } else {
        //             if (value < 18) {
        //                 callback(new Error('Must be over 18 years of age'));
        //             } else {
        //                 callback();
        //             }
        //         }
        //     }, 1000);
        // };
        return {
            formCustom: {
                name: '',
                mail: '',
                passwd: '',
                old_password: '',
                passwdCheck: ''
              },
            ruleCustom: {
                name: [
                    {validator: validateName, trigger: 'blur'}
                ],
                mail: [
                    {validator: validateMail, trigger: 'blur'}
                ],
                old_password: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                passwd: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                passwdCheck: [
                    {validator: validatePassCheck, trigger: 'blur'}
                ]

            }
        }
    },
    components: {},
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style lang="scss">
    .account-content {
        width: 40%;
        margin: 0 auto;
    }
  .demo-avatar {
    text-align: center;
    margin-bottom: 20px;
  }
  .ivu-avatar-large {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 50px;
  }
  .ivu-icon-person {
    margin-top: 20px;
    font-size: 60px;
  }
  .ivu-form-item-content {
    margin: 0 auto;
  }
  .account-content {
    .demo-avatar {
        margin-left: 80px;
    }
  }

  .account-submit {
      text-align: center;
      .ivu-form-item-content {
          margin-left: 80px !important;
      }
  }
</style>
