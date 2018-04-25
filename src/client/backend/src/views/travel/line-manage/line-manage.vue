<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="enter-manage home-table">
        <Card  class="margin-bottom-20">
            <p slot="title">筛选查询</p>
            <Form ref="formInline" :model="formValidate" label-position="left" :label-width="84" inline>
                <FormItem class="margin-right-20" label="查找旅行社：">
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
        name: 'LineManage',
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                columns1: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '旅行社名称',
                        key: 'travel_name'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '线路类型',
                        key: 'line_class'
                    },
                    {
                        title: '产品性质',
                        key: 'subject'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '操作',
                        key: 'operate'
                    }
                ],
                data1: [
                    {
                        account: '1222222',
                        travel_name: '国际旅行社',
                        title: '大西洋号东莞出发深圳往返 深圳太子湾大西洋号东莞出发深圳往返 深圳太子湾',
                        line_class: '国内游',
                        subject: '跟团游',
                        price: '¥ 888.00',
                        operate: '待审核'

                    },

                ],
                formValidate: {
                    travelname: ''
                },
                ruleValidate: {
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

