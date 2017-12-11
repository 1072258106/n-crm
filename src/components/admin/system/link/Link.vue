<template>
    <div class="link">
        <div style="text-align:right;margin-bottom:16px;">
            <el-button type="primary" @click="addLinkShow">新增链接</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
            <el-table-column label="标题" prop="title">
            </el-table-column>
            <el-table-column label="链接" prop="url">
            </el-table-column>
            <!-- <el-table-column label="是否显示" prop="visible">
            </el-table-column> -->
            <el-table-column label="添加时间" prop="created_at" align="center" width="180">
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifyLink(scope.row)">修改</el-button>                    
                    <el-button type="text" @click="del(scope.row.id)">删除</el-button>                    
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="友情链接修改" :visible.sync="dialogVisible" width="40%">
            <div class="input-box">
                <span class="label">名称：</span>
                <el-input v-model="modify.title"></el-input>
            </div>
            <div class="input-box">
                <span class="label">地址：</span>
                <el-input v-model="modify.url"></el-input>
            </div>
            <!-- <div class="input-box">
                <span class="label">是否显示：</span>
                <el-radio v-model="modify.visible" label="是">是</el-radio>
                <el-radio v-model="modify.visible" label="否">否</el-radio>
            </div> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新增链接" :visible.sync="addVisible" width="40%">
            <div class="input-box">
                <span class="label">链接标题：</span>
                <el-input v-model="addLink.title"></el-input>
            </div>
            <div class="input-box">
                <span class="label">链接地址：</span>
                <el-input v-model="addLink.url"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./Link.js">
    
</script>

<style lang="scss" scoped>
@import './Link.scss';
</style>
