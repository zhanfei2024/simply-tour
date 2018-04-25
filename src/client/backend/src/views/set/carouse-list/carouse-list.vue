<template>
    <div class="carouse-list">
        <Card>
            <p slot="title">数据列表</p>
            <a href="#" slot="extra">
            <Button type="primary">
                <router-link class="add-carouse" :to="'/add-carouse/1'">添加</router-link>
            </Button>
            </a>
            <Table border :columns="columns1" :data="data1"></Table>
        </Card>
    </div>


</template>
<script>
    export default {
        name: 'Carouse',
        data () {
            return {
                switch1: false,
                columns1: [
                    {
                        title: '图片',
                        key: 'img_url',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: "https://file.iviewui.com/dist/03635a3c88122ad605117128f3fda0ca.png"
                                    },
                                    style: {
                                        width: '100%'
                                    },
                                }),
                            ]);
                        }
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
                        title: '添加时间',
                        key: 'append_time',
                    },
                    {
                        title: '排序Id',
                        key: 'sort'
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
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key : 'operate',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    attrs: {
                                        href: '/#/edit-carouse/1'
                                    },
                                    style: {
                                        width: '15px',
                                        height: '15px',
                                        cursor: 'pointer'
                                    },
                                }, '编辑'),
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        img_url: 'John Brown',
                        title: 18,
                        url: 'New York No. 1 Lake Park',
                        append_time: '2017-12-00 90:11',
                        sort: '100',
                        status: true,
                        remark: 'sssss',
                     }
                ]
            }
        },
        methods: {
            change (status) {
                this.$Message.info('开关状态：' + status);
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>
<style lang="scss">
    .add-carouse {
        color: white;
    }
</style>

