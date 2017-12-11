<template>
    <div>
        <el-dialog title="预览效果" :visible.sync="showVisible">
            <show :content="content"></show>
        </el-dialog>
        <el-row>
            <el-col :span="24" class="my-list">
                <div class="goods-list">
                    <el-row>
                        <el-col :span="24">
                            <div class="goods-title">
                                <span>我的H5手机网页</span>
                                <!-- <el-button type="primary" class="goods-add">开始制作</el-button> -->
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="res-table">
                                <el-table
                                    v-loading="dataLoading"
                                    :data="tableData"
                                    style="width: 100%"
                                    :border="true">
                                    <el-table-column
                                        prop="title"
                                        label="名称"
                                        align="left">
                                    </el-table-column>
                                    <el-table-column
                                        prop="created_at"
                                        label="创建日期"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="short_url"
                                        label="URL链接"
                                        align="left">
                                    </el-table-column>
                                    <el-table-column
                                        prop="visit_count"
                                        label="点击次数 "
                                        width="85"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        width="150"
                                        label="操作"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-button @click="show(scope.row.id)" type="text" size="small">预览</el-button>
                                            <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
                                            <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                        <el-col :span="24" class="page-part">
                            <div class="page">
                                <el-pagination
                                style="text-align:center;"
                                    v-if="dataTotal>10"
                                    @current-change="getH5list"
                                    :current-page.sync="currentPage"
                                    :page-size="10"
                                    layout="prev, pager, next, jumper"
                                    :total="dataTotal"
                                    class="pagelist">
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script src="./List.js">
</script>

<style lang="scss" scoped>
@import './List.scss';
</style>
