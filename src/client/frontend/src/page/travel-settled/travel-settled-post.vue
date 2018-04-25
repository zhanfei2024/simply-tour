<template>
  <div class="container">
    <div class="auth-container">
      <Row>
        <h2 class="auth-title text-center">旅行社入驻</h2>
        <p class="settled-text text-center">温馨提示：您提交的营业执照、身份证信息，只作为审核使用，不会在页面公开展示</p>
        <i-col span="12" offset="6">
          <Form ref="formRight" :rules="ruleValidate" :model="formRight" label-position="right">
            <FormItem prop="name">
              <p class="settled-title">旅行社名称入驻成功后不可更改</p>
              <Input v-model="formRight.title" placeholder="請輸入旅行社名稱"></Input>
            </FormItem>
            <FormItem prop="contact">
              <Input v-model="formRight.contact" placeholder="請輸入聯繫人"></Input>
            </FormItem>
            <FormItem prop="phone">
              <Input v-model="formRight.phone" placeholder="請輸入電話名稱"></Input>
            </FormItem>

            <FormItem prop="city">
              <!--<Cascader :data="location" v-model="formRight.locationId"></Cascader>-->

              <!--<Select v-model="formRight.locationId" placeholder="請選擇旅行社地區">-->
                <!--<Option value="1">New York</Option>-->
                <!--<Option value="2">London</Option>-->
                <!--<Option value="3">Sydney</Option>-->
              <!--</Select>-->
            </FormItem>
            <FormItem prop="address">
              <Input v-model="formRight.address" placeholder="請填寫旅行社地址"></Input>
            </FormItem>
            <div class="upload-pic">
              <FormItem class="upload-item">
                <p class="upload-label">旅行社logo</p>
                <div class="ios-cloud-upload-content" @click="show = !show">
                  <b class="ios-cloud-upload">
                    <span class="size">+</span>
                    <img class="upload-img upload-logo" v-show="imgDataUrl" :src="imgDataUrl">
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
                  <b class="ios-cloud-upload ios-cloud-upload-f" style="height: 168px;">
                    <span class="size" v-show="!imgDataUrl2">+</span>
                    <img class="upload-img" v-show="imgDataUrl2" :src="imgDataUrl2" height="168">
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
              <FormItem class="upload-item">
                <p class="upload-label">营业执照</p>
                <div class="ios-cloud-upload-content" @click="show3 = !show3">
                  <b class="ios-cloud-upload ios-cloud-upload-f upload-business">
                    <span class="size" v-show="!imgDataUrl3">+</span>
                    <img class="upload-img" v-show="imgDataUrl3" :src="imgDataUrl3">
                  </b>
                </div>
                <my-upload field="businessLicense" ref="business"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show3"
                           :width="238"
                           :height="168"
                           :headers="headers"
                           img-format="png"></my-upload>
              </FormItem>

            </div>
            <div class="upload-pic">
              <FormItem class="upload-item clear-margin">
                <p class="upload-label">身份证件照
                  <span class="id-pic">正面照</span>
                </p>
                <div class="ios-cloud-upload-content" @click="show4 = !show4">
                  <b class="ios-cloud-upload ios-cloud-upload-f upload-id">
                    <span class="size" style="right: 120px" v-show="!imgDataUrl4">+</span>
                    <img class="upload-img" v-show="imgDataUrl4" :src="imgDataUrl4">
                  </b>
                </div>
                <my-upload field="IDFront" ref="idJust"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show4"
                           :width="300"
                           :height="183"
                           :headers="headers"
                           img-format="png"></my-upload>
              </FormItem>
              <FormItem class="upload-item clear-margin">
                <span class="id-pic">反面照</span>
                <div class="ios-cloud-upload-content" @click="show5 = !show5">
                  <b class="ios-cloud-upload ios-cloud-upload-f upload-id">
                    <span class="size" style="right: 120px" v-show="!imgDataUrl5">+</span>
                    <img class="upload-img"  :src="imgDataUrl5">
                  </b>
                </div>
                <my-upload field="IDBack" ref="idBack"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show5"
                           :width="300"
                           :height="183"
                           :headers="headers"
                           img-format="png"></my-upload>
              </FormItem>
            </div>

            <FormItem prop="description">
              <p class="upload-label" style="margin: 40px 0 20px 0">旅行社简介</p>
              <quill-editor v-model="formRight.description"
                            :options="editorOption">
              </quill-editor>
            </FormItem>
            <FormItem class="text-center">
              <Button type="primary" class="auth-submit" :loading="loading" @click="handleSubmit('formRight')">
                <span v-if="!loading">提交資料</span>
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
  import myUpload from './../../components/image-crop-upload/upload-2';

  export default {
    components: {
      'my-upload': myUpload
    },
    data() {
      return {
        show: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        loading: false,
        editorOption: {/* quill options */},
        formRight: {
          title: '',
          contact: '',
          phone: '',
          address: '',
          locationId: '12',
          description: ''
        },
        cover: {},
        business: {},
        idJust: {},
        idBack: {},
        params: {},
        headers: {
          Authorization: `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`
        },
        imgDataUrl: '',
        errorLogo: '',
        imgDataUrl2: '',
        imgDataUrl3: '',
        imgDataUrl4: '',
        imgDataUrl5: '',
        location: [],
        ruleValidate: {
          title: [
            {required: true, message: '請輸入旅行社名称', trigger: 'blur'},
          ],
          contact: [
            {required: true, message: '請輸入聯繫人姓名', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '請輸入旅行社地址', trigger: 'blur'},
          ],
          locationId: [
            { required: true, message: '請選擇旅行社地區', trigger: 'change' }
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
    created() {
      this.getLocation();
    },
    methods: {
      handleSubmit(name) {
        this.loading = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.imgDataUrl === ''){
              this.$Message.error('請上傳Logo!');
              this.loading = false;
            }else if(this.imgDataUrl2 === ''){
              this.$Message.error('請上傳封面圖!');
              this.loading = false;
            }else if(this.imgDataUrl3 === ''){
              this.$Message.error('請上傳營業執照!');
              this.loading = false;
            }else if(this.imgDataUrl4 === ''){
              this.$Message.error('請上傳身份證正面!');
              this.loading = false;
            }else if(this.imgDataUrl4 === ''){
              this.$Message.error('請上傳身份證反面!');
              this.loading = false;
            }else{
              this.submit();
              this.$router.push('/auth/settled/examine');
              this.loading = false;
            }
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
          case 'coverImage':
            this.imgDataUrl2 = imgDataUrl;
            break;
          case 'businessLicense':
            this.imgDataUrl3 = imgDataUrl;
            break;
          case 'IDFront':
            this.imgDataUrl4 = imgDataUrl;
            break;
          case 'IDBack':
            this.imgDataUrl5 = imgDataUrl;
            break;
        }
      },
      /**
       * upload success
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },

      getLocation(){
        this.$http.get(`public/index_tree`, this.formRight).then(res => {
        }).catch(error => {
          this.$Message.error(error.response.data.message);
        });
      },
      submit() {
        this.$refs.profile.setUrl('http://127.0.0.1:4000/api/v1/merchant/travel',this.formRight,'POST');
        this.$refs.profile.prepareUpload();
      }
    }
  }
</script>

<style scoped>

</style>
