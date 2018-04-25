<template>
  <div id="parent" class="profile">
    <header class="my-head">
      <h2>基本信息</h2>
    </header>
    <div class="body management-profile-page">
      <Form class="profile-form" ref="formRight" :rules="ruleValidate" :model="formRight" label-position="right"
            :label-width="0">
        <FormItem prop="name">
          <Input :disabled="true" v-model="formRight.title" placeholder="xx旅行社"></Input>
        </FormItem>
        <FormItem prop="contact">
          <Input v-model="formRight.contact" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem prop="phone">
          <Input v-model="formRight.phone" placeholder="请输入您的电话"></Input>
        </FormItem>
        <FormItem prop="address">
          <Input v-model="formRight.address" placeholder="请输入您的详细地址，例：香港九龙旺角太子道西193号新世纪广场一楼178号铺"></Input>
        </FormItem>
        <div class="upload-pic">
          <FormItem class="upload-item">
            <p class="upload-label">旅行社logo</p>
            <div class="ios-cloud-upload-content" @click="show = !show">
              <b class="ios-cloud-upload">
                <span class="size">+</span>
                <img class="upload-img" :src="imgDataUrl">
              </b>
            </div>
            <my-upload field="logo" ref="profile"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show"
                       :width="200"
                       :height="200"
                       :headers="headers"
                       img-format="png"></my-upload>
          </FormItem>
          <FormItem class="upload-item">
            <p class="upload-label">旅行社门脸图</p>
            <div class="ios-cloud-upload-content" @click="show2 = !show2">
              <b class="ios-cloud-upload ios-cloud-upload-f">
                <span class="size">+</span>
                <img class="upload-img" :src="imgDataUrl2">
              </b>
            </div>
            <my-upload field="coverImage" ref="cover"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show2"
                       :width="285"
                       :height="400"
                       :headers="headers"
                       img-format="png"></my-upload>
          </FormItem>
        </div>

        <FormItem prop="description">
          <quill-editor v-model="formRight.description"
                        :options="editorOption">
          </quill-editor>
        </FormItem>
        <FormItem class="text-center">
          <Button type="primary" class="profile-submit" @click="handleSubmit('formRight')">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import 'babel-polyfill'; // es6 shim
  import myUpload from './../../../components/image-crop-upload/upload-2';

  export default {
    data() {
      return {
        show: false,
        show2: false,
        cover: {},
        travel: [],
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          Authorization: `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`
        },
        imgDataUrl: '',
        imgDataUrl2: '',
        loading: false,
        editorOption: {
          placeholder: '请输入旅行社简介'
        },
        formRight: {
          title: '',
          contact: '',
          phone: '',
          locationId: '',
          address: '',
          description: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '請輸入旅行社名称', trigger: 'blur'},
          ],
          contact: [
            {required: true, message: '請輸入聯繫人姓名', trigger: 'blur'},
          ],
          locationId: [
            {required: true, message: '請選擇所在地地區', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '請輸入旅行社地址', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '請輸入手機號碼', trigger: 'blur'},
            {min: 8, message: '手機號碼最小長度必須為8位', trigger: 'blur'},
            {max: 11, message: '手機號碼最大長度必須為11位', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '請輸入旅行社簡介', trigger: 'blur'},
          ]
        }
      }
    },
    components: {
      'my-upload': myUpload
    },
    created() {
      this.getTravel();
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
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        switch (field) {
          case 'logo':
            this.imgDataUrl = imgDataUrl;
            break;
          case 'cover':
            this.imgDataUrl2 = imgDataUrl;
            break;
        }
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      // 商家资料
      getTravel(){
        this.$http.get(`merchant/travel/self`).then(res => {
          this.formRight = res.data.result;
          this.imgDataUrl = this.formRight.logo;
          this.imgDataUrl2 = this.formRight.coverImage;
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      submit() {
        this.$refs.profile.setUrl('http://127.0.0.1:4000/api/v1/merchant/travel/self',this.formRight,'PUT');
        this.$refs.profile.prepareUpload();
      }
    }
  }
</script>

<style scoped>

</style>
