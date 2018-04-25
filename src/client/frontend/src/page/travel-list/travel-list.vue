<template>
  <section>
    <img src="../../assets/images/travel_list_bg.png" height="200" width="1920"/>
    <div class="container">
      <!--地区-->
      <div class="travel-list">
        <div class="list-head">
          <span class="home-title margin-border">地區</span>
          <div class="menu">
            <div class="menu-list hvr-underline-from-center hvr-underline-from-center-active">
              <a @click="search('city','133')">香港島</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a @click="search('city','133')">九龍</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a @click="search('city','133')">新界</a>
            </div>
            <div class="menu-list hvr-underline-from-center">
              <a @click="search('city','133')">旺角</a>
            </div>
          </div>
          <div class="menu-right pull-right my-head">
            <a class="active" @click="search('strong','news')">
              最新入驻
            </a>
            <a  @click="search('strong','news')">
              人气推荐
            </a>
            <a  @click="search('strong','news')">
              最多好评
            </a>
          </div>
        </div>
      </div>

      <div style="margin-top: 30px">
        <Row :gutter="10">
          <no-data v-if="lists.length  === 0" :isBtn="false" :text="'暂时没有发布线路!'"></no-data>
          <div v-if="lists.length  > 0">
            <i-col-travel :spans="6" :spanMd="8" :spanSm="12" :data="lists" >

            </i-col-travel>
          </div>
        </Row>
        <div class="page-content" v-if="lists.length  > 0">
          <Page :total="100"></Page>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import IColTravel from './../../components/i-col-traevl/i-col-travel'
  import NoData from './../../components/no-data/no-data'

  export default {
    data() {
      return {
        city: '',
        strong: '',
        querys: {},
        lists: [],
        filter:{
          limit: 12,
          page:1,
          sorting:'',
          locationId: ''
        }
      }
    },
    components: {IColTravel,NoData},

    created() {
      this.get_travel();
    },
    methods: {
      search(type, searctText) {
        this.addQuerys(type, searctText)
      },
      addQuerys(type, searctText) {
        switch (type) {
          case 'city':
            if (!this.$lodash.has(this.querys, 'cityId')) {
              this.querys.cityId = searctText;
            } else {
              this.querys = this.$lodash.omit(this.querys, ['cityId']);
            }
            this.$router.push({name: '旅行社', query: this.querys});
            break;
          case 'strong':
            if (!this.$lodash.has(this.querys, 'strong')) {
              this.querys.strong = searctText;
            } else {
              this.querys = this.$lodash.omit(this.querys, ['strong']);
            }
            this.$router.push({name: '旅行社', query: this.querys});
            break;
        }
      },
      get_travel(){
        this.$Loading.start();
        this.$http.get(
          'public/travels',
          {params: this.filter.sorting === '' ? this.$lodash.omit(this.filter, ['sorting', 'locationId']) : this.filter}
        ).then(res => {
          this.lists = res.data.result;
          this.$Loading.finish();
        }, res => {
          this.$Loading.error();
        })
      },
    }

  }
</script>

<style scoped>

</style>
