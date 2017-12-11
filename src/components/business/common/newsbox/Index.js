export default{
    data() {
        return {
            list: [],
        }
    },
    props: {
        title: {
            type: String
        },
        cid: {
            type: Number
        },
    },
    methods: {
        getList() {
            let url;
            if(this.cid == 0){
                url = "/article/hot";
            }else{
                url = "/article/hot?cid=" + this.cid
            }
            this.$http.get(url).then(
                response => {
                    let res = response.data;
                    this.list = res.list;
                }
            )
        },
        goTo(id){
            this.$router.push('/info/a/article?id='+id);
        }
    },
    mounted() {
        this.getList();
    }
}