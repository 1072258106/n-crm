<template>
    <div class="notice">
        <!--搜索用户-->
        <el-row>
            <div class="search">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6" class="search_item">
                        <label>
                            标题：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="searchTitle" placeholder="标题" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="2" class="search_item text-right">
                        <el-button size="small" type="primary" class="btns" @click="getNoticeList">搜索</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-row>
        <div style="text-align:right;margin-bottom:16px;">
            <el-button type="primary" @click="noticeVisible = true" size="small">新增公告</el-button>
        </div>
        <el-table :data="noticeList" border style="width: 100%" v-loading="noticeLoading">
            <el-table-column label="标题" prop="title">
            </el-table-column>
             <!-- <el-table-column label="内容" prop="content">
            </el-table-column> -->
            <el-table-column label="发布时间" prop="create_at">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="deleteNotice(scope.row.id)">删除</el-button>
                    <el-button type="text" @click="getNoticeContent(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination v-if="noticeTotal>10" style="text-align:center;margin-top:16px;"
            @current-change="getNoticeList"
            :current-page.sync="page"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="noticeTotal">
        </el-pagination>


        <!-- 增加公告弹框 -->
        <el-dialog title="新增公告" :visible.sync="noticeVisible" width="40%">
            <el-form label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="notice.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="notice.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="noticeVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNotice">保 存</el-button>
            </span>
        </el-dialog>

        <!-- 公告详细 -->
        <el-dialog :title="noticeTitle" :visible.sync="detailVisible" width="40%">
            <div>{{noticeContent}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                noticeList: [],
                noticeVisible:false,
                noticeTotal:0,
                notice: {},
                pageSize:10,
                page:1,
                detailVisible: false,
                noticeTitle:'',
                noticeContent:'',
                noticeLoading: false,
                searchTitle:''
            }
        },
        methods: {
            getNoticeContent(id) {
                this.detailVisible = true;
                this.$http.get('/system/notice?id='+id).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.noticeTitle = res.data.title;
                            this.noticeContent = res.data.content;
                        }
                    }
                )
            },
            getNoticeList() {
                this.noticeLoading = true;
                this.$http.get('/system/notice/list',{
                    params: {
                        page_size: this.pageSize,
                        page: this.page,
                        title: this.searchTitle
                    }
                }).then(
                    response => {
                        this.noticeLoading = false;
                        let res = response.data;
                        if(res.code == 0) {
                            this.noticeTotal = res.data.total;
                            this.noticeList = res.data.list;
                        }
                    }
                )
            },
            addNotice() {
                this.$http.post('/admin/notice',this.notice).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.noticeVisible = false;
                            this.getNoticeList();
                        }
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                )
            },
            deleteNotice(id) {
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get('admin/notice/delete?id='+id).then(
                        response => {
                            let res = response.data;
                            if(res.code == 0) {
                                this.getNoticeList();
                            }
                            this.$message({
                                message: response.data.message,
                                type: response.data.code == 0 ? "success" : "error"
                            });
                        }
                    )
                })
                
            }
        },
        mounted() {
            this.getNoticeList();
        }
    }
</script>
<style lang="scss" scoped>
.notice{
    padding: 16px;
    .el-table{
        width: 80%;
        margin: 0 auto;
    }
}
//搜索框
.search {
    margin-top: 16px;
    padding: 16px;
    color: #666;
    background-color: #fff;
    overflow: auto;
    margin-bottom: 24px;
  }
  
  .line {
    text-align: center;
    line-height: 36px;
  }

.search_item > label + div {
    margin-left: 86px;
}
.search_item > label {
    padding: 8px 16px 8px 0px;
    float: left;
}
.text-right{
    text-align: right;
}
</style>
