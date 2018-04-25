<template>
    <div class="enter-manage home-table">
        <Card class="margin-bottom-20">
            <p slot="title">筛选查询</p>
            <Form ref="formInline" :model="formValidate" label-position="left" :label-width="100" inline>
                <FormItem label="订单编号">
                    <Input v-model="formValidate.account"></Input>
                </FormItem>
                <FormItem label="用户账户">
                    <Input v-model="formValidate.username"></Input>
                </FormItem>
                <FormItem label="订单状态">
                    <Select v-model="formValidate.status">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
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
        name: 'OrderManage',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '订单编号',
                        key: 'order_id'
                    },
                    {
                        title: '下单时间',
                        key: 'order_time'
                    },
                    {
                        title: '用户账号',
                        key: 'account'
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
                        title: '订单金额',
                        key: 'price'
                    },
                    {
                        title: '订单状态',
                        key: 'status'
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
                        order_id: '254856958692',
                        order_time: '2017-12-13 09：18',
                        account: '18656895689',
                        contact: '张德标',
                        phone: '15812345678',
                        price: '¥ 888.00',
                        status: '待处理',
                        operate: '查看'

                    },

                ],
                formValidate: {
                    order: '',
                    account: '',
                    status: ''
                },
                ruleValidate: {
                    order: [
                        { required: true, message: 'The order cannot be empty', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: 'The account cannot be empty', trigger: 'blur' }
                    ],
                    status: [
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

<style lang="scss">

</style>
