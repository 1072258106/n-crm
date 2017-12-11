export default{
    data() {
        return {
            tableData: [],
            modify: {},
            dialogVisible: false,
            addVisible: false,
            addLink: {
                "title":"",
                "url":"",
            },
            listLoading: false
        }
    },
    methods: {
        modifyLink(row) {
            this.dialogVisible = true;
            this.modify = row;
        },
        getLinkList() {
            this.listLoading = true;
            this.$http.get('/site/links').then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.tableData = res.data.list;
                    }
                }
            )
        },
        edit() {
            if(this.modify.url.indexOf('http://') < 0 && this.modify.url.indexOf('https://') < 0){
                this.modify.url = 'http://' + this.modify.url;
            }
            let postData = {
                id: this.modify.id,
                url: this.modify.url,
                title: this.modify.title
            }
            this.$http.post('/admin/link/edit',postData).then(
                response => {
                    this.dialogVisible = false;
                    if(res.code == 0) {
                        this.getLinkList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        addLinkShow() {
            this.addVisible = true;
            this.addLink = {
                "title":"",
                "url":"",
            }
        },
        add() {
            if(this.addLink.url.indexOf('http://') < 0 && this.addLink.url.indexOf('https://') < 0){
                this.addLink.url = 'http://' + this.addLink.url;
            }
            this.$http.post('/admin/link/edit',this.addLink).then(
                response => {
                    this.addVisible = false;
                    if(res.code == 0) {
                        this.getLinkList();
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
                this.$http.get('/admin/link/delete?id='+id).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.getLinkList();;
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
        this.getLinkList();
    }
}