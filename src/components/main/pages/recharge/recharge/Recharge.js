export default{
    data() {
        return {
            msgData: [],
            globalApi:this.$store.state.globalApi,
            token:this.$store.state.token,
            dataLoading: false
        }
    },
    methods: {
        getMagData() {
            this.dataLoading = true;
            this.$http.get('/system/recharge/list').then(
                response => {
                    this.dataLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.msgData = res.data.list;
                    }
                }
            )
        },
        pay(id) {
            this.$http.get('/system/recharge/pay?id='+id).then(
                response => {

                }
            )
        }
    },
    mounted() {
        this.getMagData();
    }
}