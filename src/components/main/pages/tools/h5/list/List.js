import show from '../_components/Show'
export default {
    data(){
        return {
            currentPage: 1,
            tableData: [],
            dataLoading: false,
            dataTotal:0,
            showVisible: false,
            content: ''
        }
    },
    components:{
        show
    },
    methods: {
        getH5list() {
            this.dataLoading = true;
            this.$http.get('/tools/page').then(
                response => {
                    this.dataLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.tableData = res.data.list;
                        this.dataTotal = res.data.total;
                    }
                }
            )
        },
        show(id) {
            this.$http.get('/tools/page/'+id).then(
                response => {
                    this.dataLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.content = res.data.content;
                        this.showVisible = true;
                    }
                }
            )
        },
        del(id) {
            this.$confirm('删除后将无法恢复，是否继续', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            }).then(() => {
                this.$http.delete('/tools/page?id='+id).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0){
                            this.getH5list();
                        }else{
                            this.$message.error(res.message)
                        }
                    }
                )
            })
            
        },
        edit(id) {
            this.$router.push('/main/tools/h5?id='+id);
        }
    },
    mounted() {
        this.getH5list()
    }
}