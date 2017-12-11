<template>
    <div class="user">
        <!--搜索用户-->
        <el-row>
            <div class="search">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6" class="search_item">
                        <label>
                            手机号：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.mobile" placeholder="手机号" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="6" class="search_item">
                        <label>
                            QQ：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.qq" placeholder="QQ" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="6" class="search_item">
                        <label>
                            昵称：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.nick" placeholder="昵称" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="2" class="search_item text-right">
                        <el-button size="small" type="primary" class="btns" @click="getUserList">搜索</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-row>
        <el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
            <el-table-column prop="nick" label="用户昵称">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="qq" label="QQ" align="center">
            </el-table-column>
            <el-table-column prop="sms" label="短信余额" align="center">
            </el-table-column>
            <el-table-column prop="success_count" label="发送成功" align="center">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showUserChange(scope.row.id)">余额管理</el-button>
                    <el-button type="text" @click="enter(scope.row.token)">进入用户</el-button>          
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getUserList"
            :current-page.sync="search.page"
            :page-size="search.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 管理用户弹框 -->
        <el-dialog title="" :visible.sync="userChangeVisible" width="40%">
            <el-form label-width="100px">
                <el-form-item label="短信调整：">
                    <el-input-number v-model="userChange.sms" :min="-Infinity" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="userChange.note"></el-input>
                </el-form-item>
            </el-form>      
            <span slot="footer" class="dialog-footer">
                <el-button @click="userChangeVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUser">保 存</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script src="./User.js">
</script>

<style lang="sass" scoped>
@import './User.scss';
</style>
