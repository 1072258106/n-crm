export default{
    data() {
        return{
            tableData: [],
            page:1,
            pageSize: 10,
            total:0,
            search: {
                name:'',
                kw:''
            },
            listLoading: false
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            let params = {
                page_size: this.pageSize,
                page: this.page
            }
            if(this.search.kw) {
                params.kw = this.search.kw;
            }
            if(this.search.name) {
                params.name = this.search.name;
            }
            this.$http.get("/admin/active/list", {
                params
            }).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }
                }
            )
        }
    },
    mounted() {
        this.getList();
    }
}