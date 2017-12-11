<template>
    <div>
        <div class="table-container">
            <el-table :data="recordData" border v-loading="dataLoading">
                <el-table-column prop="created_at" label="时间">
                </el-table-column>
                <el-table-column prop="type_name" label="类型">
                </el-table-column>
                <el-table-column prop="increment" label="条数">
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getRecord"
            :current-page.sync="page"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default{
         data() {
            return{
                recordData: [],
                page:1,
                pageSize:10,
                total:0,
                dataLoading: false
            }
        },
        methods: {
            getRecord() {
                this.dataLoading = true;
                this.$http.get('/system/expend',{
                    params: {
                        page: this.page,
                        pageSize: this.pageSize
                    }
                }).then(
                    response => {
                        this.dataLoading = false;
                        let res = response.data;
                        if(res.code == 0){
                            this.recordData = res.data.list;
                            this.total = res.data.total;
                        }
                    }
                )
            }
        },
        mounted() {
            this.getRecord();
        }
    }
</script>