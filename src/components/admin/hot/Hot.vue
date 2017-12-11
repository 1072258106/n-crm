<template>
    <div class="link">
        <div style="text-align:right;margin-bottom:16px;">
            <el-button type="primary" @click="addHotShow">新增热门短信</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="hotLoading">
            <el-table-column label="类别" prop="strategy_name" width="100">
            </el-table-column>
            <el-table-column label="内容" prop="content" min-width="200">
            </el-table-column>
            <el-table-column label="使用次数" prop="use_count" width="100" align="center">
            </el-table-column>
            <el-table-column label="添加时间" prop="created_at" width="180" align="center">
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifyHot(scope.row)">修改</el-button>                    
                    <el-button type="text" @click="del(scope.row.id)">删除</el-button>                    
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改热门短信 -->
        <el-dialog title="" :visible.sync="dialogVisible" width="40%">
            <el-form label-width="100px">
                <el-form-item label="短信内容：">
                    <el-input type="textarea" v-model="editData.content"></el-input>
                </el-form-item>
                <el-form-item label="使用次数：">
                    <el-input-number v-model="editData.use_count" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="短信类型：">
                    <el-select v-model="messageType" placeholder="请选择">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加热门短信" :visible.sync="addVisible" width="40%">
            <el-form label-width="100px">
                <el-form-item label="短信内容：">
                    <el-input type="textarea" v-model="addHot.content"></el-input>
                </el-form-item>
                <el-form-item label="使用次数：">
                    <el-input-number v-model="addHot.use_count" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="短信类型：">
                    <el-select v-model="messageType" placeholder="请选择">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./Hot.js">
    
</script>
