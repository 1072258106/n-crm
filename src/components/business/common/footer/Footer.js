export default{
    data() {
        return{
            friendsLink:[],
            websiteInfo: this.$store.state.websiteInfo
        }
    },
    methods:{
        getLinks() {
            this.$http.get('/site/links').then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.friendsLink = res.data.list;
                    }
                }
            )
        },
        
    },
    mounted() {
        this.getLinks();
        console.log(this.$store.state.websiteInfo)
    }
}