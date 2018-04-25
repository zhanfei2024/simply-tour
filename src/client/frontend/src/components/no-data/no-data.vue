<template>
  <div>
    <div class="no-data text-center">
      <Icon type="ios-analytics" size="100"></Icon>
      <h4 class="no-text">{{texts}}</h4>
      <Button type="primary" v-if="isBtns" class="evaluate-post-submit no-submit">
        <router-link :to="postUrl">馬上發佈</router-link>
      </Button>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      text: String,
      postUrl: String,
      isBtn: Boolean,
    },
    data(){
      return{
        texts: this.text,
        isBtns: this.isBtn
      }
    }
  }
</script>

<style scoped>

</style>
