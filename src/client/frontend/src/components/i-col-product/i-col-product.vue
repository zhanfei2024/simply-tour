<template>
    <div>
        <div class="product-item" v-for="item in data">
            <i-col :lg="span" :md="md" :sm="sm">
                <router-link :to="{ path: `travel/1/product/domestic/1/details`}">
                    <div class="product-item-container">
                      <div class="help">

                        <img src="../../assets/images/product_bg.png" height="30" width="60" class="pull-left"/>
                        <span class="text">自助</span>
                      </div>
                      <div class="hovereffect">
                        <img v-lazy="item.coverImageUrl" class="img-responsive" style="height: 200px;width: 100%;">
                        <div class="overlay">

                          <a class="info" href="#">
                            <p>
                              目的地： 深圳
                            </p>
                            <p>
                              深圳往返泰国曼谷、芭堤雅、沙美经
                              典6天5晚跟团游深圳往返泰国曼谷
                            </p>
                            <span class="">立即预定</span>
                          </a>
                        </div>
                      </div>
                        <h2 class="product-title text-overflow">
                          深圳往返泰国曼谷、芭堤雅、沙美经
                          典6天5晚跟团游深圳往返泰国曼谷
                        </h2>
                        <p class="product-text clearfix">
                            <span class="pull-left product-money">$2999元起</span>
                            <span class="pull-right product-address">廣州出發</span>
                        </p>
                    </div>
                </router-link>
            </i-col>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            spans: Number,
            spanMd: Number,
            spanSm: Number,
            data: Array
        },
        data() {
            return {
                span: this.spans,
                md: this.spanMd,
                sm: this.spanSm,
            }
        },

    }
</script>

<style scoped>

</style>
