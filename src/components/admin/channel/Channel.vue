<template>
    <div>
        <!-- 选择通道 -->
        <el-form label-width="120px">
            <el-form-item label="选择通道：">
                <el-select v-model="channelId" placeholder="请选择" @change="channelChange">
                        <el-option
                            v-for="item in channelList"
                            :key="item.id"
                            :label="item.channel_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
            </el-form-item>
        </el-form>

        <!-- 签名列表 -->
        <el-table :data="signList" border style="width: 100%" v-loading="dataLoading">
            <el-table-column label="签名" prop="label">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.status" style="color:#409eff;">已启用</div>
                    <div v-else style="color:#fa5555;">已禁用</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifySignShow(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改签名弹框 -->
        <el-dialog title="修改签名" :visible.sync="signModifyVisible" width="40%">
            <el-form label-width="80px">
                <el-form-item label="签名">
                    <el-input v-model="modifySign.label"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-radio v-model="modifySign.status" :label="true">启用</el-radio>
                    <el-radio v-model="modifySign.status" :label="false">禁用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="signModifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveModify">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                signList: [],
                channelList: [],
                channelId:0,
                modifySign: {},//修改签名的提交数据
                signModifyVisible: false,
                dataLoading: false
            }
        },
        methods: {
            getChannelList() {
                this.dataLoading = true;
                this.$http.get('/admin/channel/list').then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.dataLoading = false;
                            this.channelList = res.data.list;
                            this.channelId = this.channelList[0].id;
                            this.getSignList();
                        }
                    }
                )
            },
            getSignList() {
                this.$http.get('/admin/channel/signs?channel_id='+this.channelId).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.signList = res.data.list;
                            console.log(this.signList)
                        }
                    }
                )
            },
            saveModify() {
                this.$http.post('/admin/channel/sign',this.modifySign).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.signModifyVisible = false;
                            this.getSignList();
                        }
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                )
            },
            modifySignShow(row) {
                this.modifySign = row;
                console.log('row',row)
                this.signModifyVisible = true;
            },
            channelChange(val) {
                this.channelId = val;
                this.getSignList();
            }
        },
        mounted() {
            this.getChannelList();
        }
    }
</script>