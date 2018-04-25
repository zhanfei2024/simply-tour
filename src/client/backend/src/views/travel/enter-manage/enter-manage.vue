<style lang="less">
    @import './enter-manage.less';
    @import '../../../styles/common.less';
</style>
<template>
    <div class="enter-manage">
        <Card class="margin-bottom-20">
            <p slot="title">筛选查询</p>
          <Form ref="formInline" :model="formValidate" label-position="left" :label-width="84" inline>
            <FormItem class="margin-right-20" label="用户账户：">
                <Input v-model="formValidate.account"></Input>
            </FormItem>
            <FormItem class="margin-right-20" label="用户姓名：">
                <Input v-model="formValidate.username"></Input>
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
        name: 'EnterManage',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '用户ID',
                        key: 'user_id'
                    },
                    {
                        title: '账号',
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
                        title: '状态',
                        key: 'status'
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
                        user_id: '122323',
                        account: '1222222',
                        travel_name: '国际旅行社',
                        contact: '刘长发',
                        phone: '13333444',
                        submit_time: '2017-12012',
                        status: '待审核',
                        operate: '操作'

                    },

                ],
                formValidate: {
                    account: '',
                    username: '',
                    travelname: ''
               },
                ruleValidate: {
                    account: [
                        { required: true, message: 'The account cannot be empty', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: 'The username cannot be empty', trigger: 'blur' }
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


