<template>
  <div id="parent" class="profile">
    <header class="my-head">
      <h2> 添加轮播图 (最多添加5张 根据数字排序 数字越大越靠前)</h2>
    </header>
    <div class="body management-carouse-form-page">
      <Form class="carouse-form clearfix" ref="carouselForm" :rules="ruleValidate" :model="carouselForm" label-position="top">
        <div class="upload-carousel pull-left">
          <FormItem class="upload-item">
            <div class="upload-img-icon" @click="showUpload = !showUpload">
              <Icon type="plus" size="52" style="color: #646464"></Icon>
              <img class="upload-img" :src="imgDataUrl" v-if="imgDataUrl" style="width: 100%">
            </div>
            <my-upload field="picture" ref="profile"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="showUpload"
                       :width="1200"
                       :height="470"
                       :headers="headers"
                       img-format="png"></my-upload>
          </FormItem>
        </div>
        <div class="carosel-text pull-left">
          <FormItem class="input-title" prop="title">
            <Input type="text" v-model="carouselForm.title" placeholder="请输入轮播图标题"></Input>
          </FormItem>
          <FormItem class="input-url" prop="link">
            <Input type="text" v-model="carouselForm.link" placeholder="新请输入链接地址密碼"></Input>
          </FormItem>
          <FormItem class="input-order" prop="order">
            <Input type="text" v-model="carouselForm.order" placeholder="请输入排序数字"></Input>
          </FormItem>
          <FormItem class="text-left" style="margin-top: 90px">
            <Button type="primary" class="add-carousel-submit" @click="handleSubmit('carouselForm')">添加轮播图</Button>
          </FormItem>
        </div>
      </Form>


    </div>

  </div>
</template>

<script>
  import 'babel-polyfill'; // es6 shim
  import myUpload from '../../../components/image-crop-upload/upload-2';

  export default {
    name: "carousel",
    data() {
      return {
        currentNum: 0,
        showUpload: false,
        sumCarouselForm: [],
        loading: false,
        headers: {
          Authorization: `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`
        },
        imgDataUrl: '',
        carouselForm: {
          picture: '',
          title: '',
          link: '',
          order: ''
        },
        ruleValidate: {
          picture: [
            {required: true, message: '请上传轮播图', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入轮播图标题', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '请输入链接地址', trigger: 'blur'},
          ],
          order: [
            {required: true, message: '请输入排序数字', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
    },
    methods: {
      handleSubmit(name) {
        this.loading = true;
        console.log(name,"#33333333")
        this.$refs[name].validate((valid) => {
          console.log(valid,"#11111111")

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
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl) {
        this.imgDataUrl = imgDataUrl;
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
      submit() {
        console.log("#333333333")
        this.$refs.profile.setUrl('http://127.0.0.1:4000/api/v1/merchant/slide_show',this.carouselForm,'POST');
        this.$refs.profile.prepareUpload();
      }
    },
    components: {
      myUpload
    }
  }
</script>

<style scoped>

</style>
