export default{
    data() {
        return {
            tableData: [],
            page:1,
            pageSize:10,
            total:0,
            detail: {}
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        token() {
            return this.$store.state.token;
        },
        globalApi() {
            return this.$store.state.globalApi;
        }
    },
    filters: {
        overflow: function(text) {
            let result
            if (text.length > 70) {
                result = text.substring(0, 70) + '...'
            } else {
                result = text
            }
            return result
        }
    },
    methods: {
        getTableData() {
            this.$http.get("/active/records", {
                params: {
                    page: this.page,
                    page_size: this.pageSize,
                    id: this.$route.params.id
                }
            }).then(
                response => {
                    let res = response.data;
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                }
                )
        },
        getDetails() {
            this.$http.get("/active/detail", {
                params: {
                    id: this.$route.params.id
                }
            }).then(
                response => {
                    let res = response.data;
                    if(res.code == 0){
                        this.detail = res.data;
                    }
                }
                )
        }
    },
    mounted() {
        this.getTableData();
        this.getDetails();
    }
}