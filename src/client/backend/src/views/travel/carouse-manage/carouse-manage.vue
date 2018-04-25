<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="enter-manage home-table">
        <Card  class="margin-bottom-20">
            <p slot="title">筛选查询</p>
            <Form ref="formInline" :model="formValidate" label-position="left" :label-width="84" inline>
                <FormItem class="margin-right-20" label="旅行社名称：">
                    <Input v-model="formValidate.account"></Input>
                </FormItem>
                <FormItem class="margin-right-20" label="轮播图标题：">
                    <Input v-model="formValidate.travelname"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">查询结果</Button>
                </FormItem>
            </Form>

        </Card>
        <Card  class="margin-bottom-20">
            <p slot="title">数据列表</p>
            <Table :columns="columns1" :data="data1" class="margin-bottom-20"></Table>
            <Page :total="100" show-total show-elevator></Page>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'CarouseManage',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '图片',
                        key: 'img'
                    },
                    {
                        title: '旅行社名称',
                        key: 'travelname'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '链接地址',
                        key: 'url'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('input', {
                                    attrs: {
                                        type: 'checkbox'
                                    },
                                    style: {
                                        width: '15px',
                                        height: '15px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        change (status) {
                                            // this.$Message.info('开关状态：' + status);
                                            console.log(status.target.checked)
                                        }
                                    }
                                }, 'View'),
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    attrs: {
                                        href: '/#/order/order-detail/1'
                                    },
                                    style: {
                                        width: '15px',
                                        height: '15px',
                                        cursor: 'pointer'
                                    },
                                }, '查看'),
                            ]);
                        }   
                    }
                ],
                data1: [
                    {
                        img: '图片',
                        travelname: '四川省中国青年旅行社少城分社',
                        title: '大西洋号东莞出发深圳往返 深圳太子湾大西洋号东莞出发深圳往返 深圳太子湾',
                        url: 'http://www.baidu.com',
                     },
                ],
                formValidate: {
                    account: '',
                    travelname: ''
                },
                ruleValidate: {
                    account: [
                        { required: true, message: 'The account cannot be empty', trigger: 'blur' }
                    ],
                    travelname: [
                        { required: true, message: 'The account cannot be empty', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>

