<template>
  <div class="container">
     <div class="auth-settled-examine">
       <div class="success" v-show="status === 'pending'">
         <Icon type="checkmark-circled" size="100"></Icon>
         <h2>资料提交成功</h2>
         <p>请耐心等待审核，预计1-3天完成审核</p>
       </div>
       <div class="failed"  v-show="status === 'failed'">
         <Icon type="close-circled" size="100"></Icon>
         <h2>资料审核不通过</h2>
         <p>不通过原因： 您提交的营业执照照片不清楚，而且和旅行社名称不匹配，所以我们没有给予通过，重新提交</p>
         <router-link class="ivu-btn-primary home-more" style="margin-top: 20px;padding: 12px 60px" to="/auth/settled">请重新提交</router-link>
       </div>
     </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        status: '',
      }
    },
    created() {
      this.status = sessionStorage.getItem('travelStatus');
    }
  }
</script>

<style scoped>

</style>
