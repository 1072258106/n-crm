<template>
    <div class="activity">
        <!--搜索活动-->
        <el-row>
            <div class="search">
                <el-row type="flex" justify="space-between">
                    <el-col :span="7" class="search_item">
                        <label>
                            用户信息：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.kw" placeholder="输入手机号、qq、昵称" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>
                            活动名称：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.name" placeholder="活动名称" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>


                    <el-col :span="7" class="search_item text-right">
                        <el-button size="small" type="primary" class="btns" @click="getList">搜索</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-row>
        <el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
            <el-table-column prop="user_info.nick" label="用户名" width="100"></el-table-column>
            <el-table-column prop="user_info.mobile" label="用户手机号" width="130" align="center"></el-table-column>
            <el-table-column prop="name" label="活动名称" width="100">
            </el-table-column>
            <el-table-column prop="content" label="短信内容" min-width="200">
            </el-table-column>
            <el-table-column label="时间详情" width="240=">
                <template slot-scope="scope">
                    <div class="time">
                        <p>创建时间：{{scope.row.created_at}}</p>
                        <p>发送时间：{{scope.row.send_time}}</p>
                    </div>                    
                </template>
            </el-table-column>
            <!-- <el-table-column prop="path" label="通道信息" width="80">
            </el-table-column> -->
            <el-table-column prop="count" label="发送数量" width="90">
            </el-table-column>
            <el-table-column prop="status_name" label="发送结果" width="85">
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getList"
            :current-page.sync="page"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script src="./Activity.js">
</script>

<style lang="scss" scoped>
@import './Activity.scss';
</style>

