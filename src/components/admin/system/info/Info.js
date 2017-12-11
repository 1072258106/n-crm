export default{
    data() {
        return{
            globalApi: this.$store.state.globalApi,
            header: {
                "Access-Token": this.$store.state.adminToken
            },
            info: {
            }
        }
    },
    methods: {
        handlePreview() {
            console.log(s)
        },
        handleRemove() {
            console.log(s)
        },
        uploadSuccess(res) {
            if(res.code == 0) {
                this.info.weixinewm = res.data.path;
            }else{
                this.$message.error(res.message)
            }
            
        },
        getInfo() {
            this.$http.get('/site/site_config').then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.info = res.data;
                    }
                }
            )
        },
        changeInfo() {
            this.$http.post('/admin/site/edit',this.info).then(
                response => {
                    let res = response.data;
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        }
    },
    mounted() {
        this.getInfo();
    }
}