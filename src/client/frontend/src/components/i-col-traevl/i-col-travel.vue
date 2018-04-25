<template>
    <div class="clearfix">
        <div class="travel-item" v-for="item in data">
            <i-col :lg="span" :md="md" :sm="sm">
                <div class="travel-item-container ">
                    <router-link :to="{ path: `travel/${item.id}/home`}">
                        <i-col span="24" style="padding: 0">
                            <div class="text-left travel-content hvr-sweep-to-top">
                                <img v-lazy="item.coverImage" class="img-responsive travel-cover">
                                <h2 class="travel-name ">
                                 {{item.title}}
                                </h2>
                            </div>
                        </i-col>
                    </router-link>
                </div>
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
        }
    }
</script>
