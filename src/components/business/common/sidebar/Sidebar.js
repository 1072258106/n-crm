export default{
    data(){
        return {
            weixinShow: false,
            phoneShow: false,
            info: this.$store.state.websiteInfo,
            globalApi: this.$store.state.globalApi
        }
    },
    methods: {
        backToTop() {
            this.$store.commit('backToTop');
        },
        enter(tar) {
            if(tar == 'weixin') {
                this.weixinShow = true;
            }
            if(tar == 'phone') {
                this.phoneShow = true;
            }
        },
        leave(tar) {
            if(tar == 'weixin') {
                this.weixinShow = false;
            }
            if(tar == 'phone') {
                this.phoneShow = false;
            }
        },
    }
}