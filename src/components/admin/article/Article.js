import Editor from './_components/Editor.vue';
export default{
    components: {
        'v-editor': Editor
    },
    data() {
         return {
             articleData: [],
             addTypeInfo:{},
             addVisible:false,
             dialogVisible:false,
             categoryLoading:false,
             edit: {},
             globalApi: this.$store.state.globalApi,
             header: {
                 "Access-Token": this.$store.state.adminToken
             },
             url:''
         }
    },
    methods: {
        gotoList(id) {
            this.$router.push('/admin/article_list?id='+id);
        },
        getChildList(row) {
            this.listLoading = true;
            this.$http.get('/admin/category/list?parent_id='+row.id).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        row.childList = res.data.list;
                    }
                }
            )
        },
        getArticleData() {
            this.categoryLoading = true;
            this.$http.get('/admin/category/list').then(
                response => {
                    this.categoryLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.articleData = res.data.list;
                        let that = this;
                        that.articleData.forEach(element => {
                            element.childList = that.getChildList(element);
                        });
                    }
                }
            )
        },
        addShow(pid,id,title) {
            if(typeof(id) == 'number') {
                this.addTypeInfo.title = title;
                this.addTypeInfo.id = id;
            }
            this.addTypeInfo.parent_id = pid;
            this.addVisible = true;
        },
        addType() {
            this.$http.post('/admin/category/edit',this.addTypeInfo).then(
                response => {
                    let res = response.data;
                    if(res.code == 0){
                        this.addVisible = false;
                        this.getArticleData();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        deleteArticle(id) {
            this.$http.get('/admin/category/delete?id='+id).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.getArticleData();
                    }
                }
            )
        },
        addArticle(cid) {
            this.dialogVisible = true;
            this.edit = {};
            this.edit.cid = parseInt(cid);
            this.edit.top = 1;
            this.edit.content = '';
            this.edit.isShow = 1;
            this.edit.links = 1;
        },
        save() {
            this.$http.post("/admin/article/edit", this.edit).then(response => {
                let res = response.data;
                if(res.code == 0) {
                    this.dialogVisible = false;
                    this.getArticleData();
                }
                this.$message({
                    message: response.data.message,
                    type: response.data.code == 0 ? "success" : "error"
                });
            }); 
        },
        uploadSuccess(res) {
            if(res.code == 0) {
                this.url = res.data.path;
            }else{
                this.$message.error(res.message)
            }
            
        },
        
        contentChange(val) {//文章内容修改
            this.edit.content = val;
        }
    },
    mounted() {
        this.getArticleData();
    }
}