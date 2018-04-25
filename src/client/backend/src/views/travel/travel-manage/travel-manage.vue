<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="enter-manage">
        <Card  class="margin-bottom-20">
            <p slot="title">筛选查询</p>
            <Form ref="formInline" :model="formValidate" label-position="left" :label-width="84" inline>
                <FormItem class="margin-right-20" label="用户账户：">
                    <Input v-model="formValidate.account"></Input>
                </FormItem>
                <FormItem class="margin-right-20" label="旅行社名称：">
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
        name: 'TravelManage',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '用户ID',
                        key: 'user_id'
                    },
                    {
                        title: '账户',
                        key: 'account'
                    },
                    {
                        title: '旅行社名称',
                        key: 'travel_name'
                    },
                    {
                        title: '联系人',
                        key: 'contact'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    },
                    {
                        title: '提交时间',
                        key: 'submit_time'
                    },
                    {
                        title: '订单数',
                        key: 'order_num'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    attrs: {
                                        href: '/#/travel-detail/1'
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        user_id: '用户ID',
                        account: '账号',
                        travel_name: '旅行社名称',
                        contact: '联系人',
                        phone: '联系电话',
                        submit_time: '提交时间',
                        order_num: '2',

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
                        { required: true, message: 'The travelname cannot be empty', trigger: 'blur' }
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

