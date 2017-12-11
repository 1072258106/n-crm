<template>
    <div>
        <el-table :data="articleData" style="width: 100%" v-loading="categoryLoading">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.childList" v-loading="listLoading">
                        <el-table-column label="分类名" prop="title">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="gotoList(scope.row.id)">查看文章列表</el-button>
                                <el-button type="text" @click="addShow(scope.row.parent_id,scope.row.id,scope.row.title)">修改分类名</el-button>           
                                <el-button type="text" @click="deleteArticle(scope.row.id)">删除该类</el-button>                    
                                <el-button type="text" @click="addArticle(scope.row.id)">添加文章</el-button>                    
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <!-- <el-table-column label="cid" prop="id">
            </el-table-column> -->
            <el-table-column label="文章分类" prop="title">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="addShow(scope.row.id)">添加分类</el-button>                   
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="addTypeInfo.id ? '修改分类' : '添加分类'" :visible.sync="addVisible" width="40%">
            <!-- 修改框 -->
            <el-input v-model="addTypeInfo.title"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addType">保 存</el-button>
            </span>
        </el-dialog>

        <!-- 添加文章 -->
        <el-dialog title="" :visible.sync="dialogVisible" width="60%">
            <!-- 修改框 -->
            <el-form  label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题">
                    <el-input v-model="edit.title"></el-input>
                </el-form-item>
                <el-form-item label="标题图片">
                    <img :src="globalApi+url" :alt="globalApi+url" v-if="url" height="40">
                    <el-upload :action="globalApi+'/tools/image_upload'" :headers="header" :on-success="uploadSuccess" :show-file-list="false">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="edit.description"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input type="textarea" v-model="edit.keywords"></el-input>
                </el-form-item>
                <el-form-item label="文章内容">
                    <v-editor :content="edit.content" @change="contentChange"></v-editor>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input type="textarea" v-model="edit.origin"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input type="textarea" v-model="edit.author"></el-input>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-radio-group v-model="edit.isShow">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否置顶">
                    <el-radio-group v-model="edit.top">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="排序">
                    <el-input v-model="edit.sort"></el-input>
                </el-form-item> -->
                <el-form-item label="点击量">
                    <el-input v-model="edit.clicknum"></el-input>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./Article.js">    
</script>
<style lang="scss" scoped>
@import './Article.scss';
</style>
