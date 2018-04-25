<template>
  <div>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">编辑轮播图</p>
        <Form class="carouse-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
            <FormItem label="标题" prop="title">
                <Input v-model="formCustom.title" placeholder="Enter your title"></Input>
            </FormItem>
            <FormItem label="链接" prop="url">
                <Input v-model="formCustom.url" placeholder="Enter your url"></Input>
            </FormItem>
            <FormItem label="上传轮播图">
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="loadlogo">
            </FormItem>
            <FormItem label="排序id" prop="sort">
                <Input type="text" v-model="formCustom.sort" placeholder="The larger the number, the bigger the number, the better the ranking"></Input>
            </FormItem>
            <FormItem label="备注信息" prop="remark">
                <Input v-model="formCustom.remark" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="Enter something..."></Input>
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
export default {
  name: "EditCarouse",
  data() {
    return {
      file: null,
      loadingStatus: false,
      formCustom: {
        title: "",
        url: "",
        upload_pic: "",
        sort: "",
        remark: "",
      },
      ruleCustom: {
        title: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        upload_pic: [
          {
            required: true,
            message: "The des cannot be empty",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "The keyword cannot be empty",
            trigger: "blur"
          }
        ],
        remark: [
          { required: true, message: "Please enter a about", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
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
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
  .carouse-form {
    width: 36%;
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
</style>
