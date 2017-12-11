<template>
        <div>
            <!-- 修改文章的弹框 -->
            <el-dialog title="" :visible.sync="myVisible" width="60%" @close="close">
                <!-- 修改框 -->
                <el-form  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题">
                        <el-input v-model="edit.title"></el-input>
                    </el-form-item>
                    <el-form-item label="标题图片">
                        <img :src="globalApi+url" :alt="globalApi+url" v-if="url" style="height:40px;">
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
                        <el-input v-model.number="edit.clicknum"></el-input>
                    </el-form-item>
                </el-form>


                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="saveChange">保 存</el-button>
                </span>
            </el-dialog>
        </div>
</template>
<script>
import Editor from './Editor.vue';
    export default{
        components: {
            'v-editor': Editor
        },
        data() {
            return{
                globalApi: this.$store.state.globalApi,
                header: {
                    "Access-Token": this.$store.state.adminToken
                },
                myVisible: false,
                url:''
            }
        },
        props: {
            dialogVisible: {
                type:Boolean
            },
            edit: {}
        },
        watch: {
            dialogVisible() {
                this.myVisible = this.dialogVisible;
            }
        },
        methods: {
            contentChange(val) {//文章内容修改
                this.edit.content = val;
            },
            saveChange() {
                this.$http.post("/admin/article/edit", this.edit).then(response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.$emit("success", false);
                    }else{
                        this.$emit("success", true);
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }); 
            },
            uploadSuccess(res) {
                console.log(res)
                if(res.code == 0) {
                    this.url = res.data.path;
                }else{
                    this.$message.error(res.message)
                }
                
            },
            close() {
                this.$emit("close");
            }
        },
        mounted() {
            this.url = this.edit.pic;
        }
    }
</script>