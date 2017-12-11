export default{
    data() {
        return{
            recordData: [],
            page:1,
            pageSize:10,
            total:0,
            recordLoading: false
        }
    },
    methods: {
        getRecord() {
            this.recordLoading = true;
            this.$http.get('/system/recharge/records',{
                params: {
                    page: this.page,
                    pageSize: this.pageSize
                }
            }).then(
                response => {
                    this.recordLoading = false;
                    let res = response.data;
                    if(res.code == 0){
                        this.recordData = res.data.list;
                        this.total = res.data.total;
                    }
                }
            )
        },
        pay(row) {
            let url = this.$store.state.globalApi + '/system/recharge/pay?id='+row.meal+'&record_id='+row.id+'&token=' + this.$store.state.token;
            let tempwindow = window.open('_blank');
            tempwindow.location = url;
        }
    },
    mounted() {
        this.getRecord();
    }
}