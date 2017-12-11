<template>
    <div>
        <div style="text-align:right;margin-bottom:16px;">
            <el-button type="primary" @click="editArtile(cid)">新增文章</el-button>
        </div>
        <el-table :data="dataList">
            <el-table-column label="文章标题" prop="title">
            </el-table-column>
            <el-table-column label="点击量" prop="click_num">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="editArtile(scope.row.cid,scope.row.id)">修改</el-button>
                    <el-button type="text" @click="deleteArticle(scope.row.id)">删除</el-button>                    
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getList"
            :current-page.sync="page"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 修改文章的弹框 -->
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
                <el-button type="primary" @click="saveChange">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Editor from './_components/Editor.vue';
    export default{
        components: {
            'v-editor': Editor
        },
        data() {
            return{
                page:1,
                page_size: 10,
                total:0,
                dataList: [],
                dialogVisible:false,
                edit: {},
                globalApi: this.$store.state.globalApi,
                header: {
                    "Access-Token": this.$store.state.adminToken
                },
                url:''
            }
        },
        computed: {
            cid() {
                return this.$route.query.id
            }
        },
        methods: {
            getList() {
                let cid = parseInt(this.cid);
                this.$http.get('/article/list?page='+this.page+'&page_size='+this.page_size+'&cid='+cid).then(
                    response => {
                        let res = response.data;
                        this.dataList = res.list;
                        this.total = res.total;
                    }
                )
            },
            contentChange(val) {//文章内容修改
                this.edit.content = val;
            },
            editArtile(cid,id) {
                if(typeof(id) == 'number'){
                    this.$http.get('/article?id='+id).then(
                        response => {
                            let res = response.data;
                            this.edit = res;
                            this.edit.isShow = this.edit.is_show;
                            this.edit.clicknum = this.edit.click_num;
                            this.url = this.edit.pic;
                            this.dialogVisible = true;
                        }
                    )
                }else {
                    this.dialogVisible = true;
                    this.edit = {};
                    this.edit.cid = parseInt(cid);
                    this.edit.top = 1;
                    this.edit.content = '';
                    this.edit.isShow = 1;
                    this.edit.links = 1;
                }
            },
            
            
            saveChange() {
                this.$http.post("/admin/article/edit", this.edit).then(response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.dialogVisible = false;
                        this.getList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }); 
            },
            deleteArticle(id) {
                this.$http.get('/admin/article/delete?id='+id).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.getList()
                        }
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                )
            },
            uploadSuccess(res) {
                if(res.code == 0) {
                    this.url = res.data.path;
                }else{
                    this.$message.error(res.message)
                }
                
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>
