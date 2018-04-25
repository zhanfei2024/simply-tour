<template>
  <div class="page">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">账户设置</p>
        <Form class="info-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
            <FormItem label="平台名称" prop="name">
                <Input v-model="formCustom.name" placeholder="例如：xx旅行社平台"></Input>
            </FormItem>
            <FormItem label="平台标题" prop="title">
                <Input v-model="formCustom.title" placeholder="Enter your title"></Input>
            </FormItem>
            <FormItem label="平台描述" prop="des">
                <Input type="text" v-model="formCustom.des" placeholder="Enter your platform description"></Input>
            </FormItem>
            <FormItem label="关键词" prop="keyword">
                <Input type="text" v-model="formCustom.keyword" placeholder="Enter your key word"></Input>
            </FormItem>
            <FormItem label="上传logo">
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="loadlogo">
            </FormItem>
            <FormItem label="关于我们" prop="about">
                <Input v-model="formCustom.about" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter about us"></Input>
            </FormItem>
            <FormItem label="联系我们" prop="contact">
                <Input v-model="formCustom.contact" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter contact us with information"></Input>
            </FormItem>
            <FormItem label="用户协议" prop="agreement">
                <Input v-model="formCustom.agreement" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter user protocol"></Input>
            </FormItem>
           <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>

  </div>
</template>

<script type="text/ecmascript-6">
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";
export default {
  name: "Info",
  data() {
    return {
      // files: [],
      file: null,
      loadingStatus: false,
      formCustom: {
        name: "",
        title: "",
        des: "",
        keyword: "",
        about: "",
        contact: "",
        agreement: ""
      },
      ruleCustom: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        des: [
          {
            required: true,
            message: "The des cannot be empty",
            trigger: "blur"
          }
        ],
        keyword: [
          {
            required: true,
            message: "The keyword cannot be empty",
            trigger: "blur"
          }
        ],
        // files: [
        //   {
        //     required: true,
        //     message: "The logo cannot be empty",
        //     trigger: "blur"
        //   }
        // ],
        about: [
          { required: true, message: "Please enter about us", trigger: "blur" },
          {
            type: "string",
            min: 1,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ],
        contact: [
          { required: true, message: "Please enter contact", trigger: "blur" },
          {
            type: "string",
            min: 1,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ],
        agreement: [
          {
            required: true,
            message: "Please enter agreement",
            trigger: "blur"
          },
          {
            type: "string",
            min: 1,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    FileUpload
  },
  methods: {
    handleUpload(file) {
      this.formCustom.file = file;
      return false;
    },
    handleSubmit(name) {
      let formDate = new FormData();
      for (const key in this.formCustom) {
        if (this.formCustom.hasOwnProperty(key)) {
          const element = this.formCustom[key];
          formDate.append(key, element);
        }
      }
      formDate.append("logo", this.$refs.loadlogo.files[0]);
      console.log(this.$refs.loadlogo.files[0]);
      if (this.$refs.loadlogo.files[0]) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$http.post("/122", formDate);
            this.$Message.success("Success!");
          } else {
            this.$Message.error("Fail!");
          }
        });
      } else {
        this.$Message.error("请上传logo!");
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss">
.info-form {
  width: 40%;
  margin: 0 auto;
}
.custom-requied-point::before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.file-uploads.file-uploads-html4 input[type="file"] {
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-uploads.file-uploads-html5 input[type="file"] {
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
</style>
