export default{
    data() {
        return{
            info: {},
            breads: []
        }
    },
    methods: {
        getInfo() {
            this.$http.get('/user/info').then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.info = res.data;
                        console.log('header',this.info)
                    }
                }
            )
        },
        logout() {
            this.$store.commit("setToken", '');
            this.$cookie.delete("Access-Token");
            this.$router.push('/login');
        }
    },
    watch: {
        '$route'() {
            if(this.$route.path == '/main/message/record' || this.$route.path == '/main/recharge/record'){
                this.getInfo();
            }
        }
    },
    mounted() {
        this.getInfo();
        this.breads = this.$route.matched;
    },
    watch: {
        $route(to, from) {
            this.breads = to.matched;
        }
      },
}