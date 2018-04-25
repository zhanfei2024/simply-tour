<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="enter-manage">
        <Card class="margin-bottom-20">
            <p slot="title">筛选查询</p>
            <Form ref="formInline" :model="formValidate" label-position="left" :label-width="84" inline>
                <FormItem label="用户账户：">
                    <Input v-model="formValidate.account"></Input>
                </FormItem>
                <FormItem label="注册时间：">
                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">查询结果</Button>
                </FormItem>
            </Form>

        </Card>
        <Card  class="margin-bottom-20">
            <p slot="title">数据列表</p>
            <Table :columns="columns1" :data="data1" class="margin-bottom-20"></Table>
            <Page :total="100" show-elevator></Page>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'MemberList',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '用户ID',
                        key: 'user_id'
                    },
                    {
                        title: '用户名',
                        key: 'user_name'
                    },
                    {
                        title: '注册时间',
                        key: 'register_time'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    attrs: {
                                        href: '/#/member/member-detail/1'
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
                        user_id: '15812345678',
                        user_name: 'test',
                        register_time: '2017-12-19 14:50',
                        operate: '查看'
                    },

                ],
                formValidate: {
                    account: '',
                    data: ''
                },
                ruleValidate: {
                    account: [
                        { required: true, message: 'The account cannot be empty', trigger: 'blur' }
                    ],
                    data: [
                        { required: true, message: 'Please select the status', trigger: 'change' }
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
