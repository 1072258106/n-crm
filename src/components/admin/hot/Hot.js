export default{
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            addVisible: false,
            addHot: {
                content:"",
                user_count:""
            },
            typeList:[],
            messageType:0,
            editData:{},
            hotLoading: false
        }
    },
    methods: {
        modifyHot(row) {
            this.dialogVisible = true;
            this.editData = row;
            this.messageType = row.strategy
        },
        getList() {
            this.hotLoading = true;
            this.$http.get('/system/template/list').then(
                response => {
                    this.hotLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.tableData = res.data.list;
                    }
                }
            )
        },
        getTypeList() {
            this.$http.get('/system/template/category').then(
                response => {
                    let res = response.data;
                    this.typeList = res.list;
                    this.messageType = res.list[0].id;
                }
            )
        },
        edit() {
            let postData = {
                id: this.editData.id,
                content: this.editData.content,
                use_count: this.editData.use_count,
                strategy: this.messageType
            }
            this.$http.post('/admin/template/edit',postData).then(
                response => {
                    let res = response.data;
                    this.dialogVisible = false;
                    if(res.code == 0) {
                        this.getList();
                        this.getTypeList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        addHotShow() {
            this.addVisible = true;
            this.messageType = this.typeList[0].id;
            this.addHot = {
                content:"",
                use_count:""
            }
        },
        add() {
            let postData = {
                content: this.addHot.content,
                use_count: this.addHot.use_count,
                strategy: this.messageType
            }
            this.$http.post('/admin/template/edit',postData).then(
                response => {
                    this.addVisible = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.getList();
                        this.getTypeList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        del(id) {
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get('/admin/template/delete?id='+id).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.getList();
                            this.getTypeList();
                        }
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                )
            })
            
        }
    },
    mounted() {
        this.getList();
        this.getTypeList();
    }
}