import Banner from '../../common/banner/Banner.vue';
export default{
    components: {
        'v-banner':Banner
    },
    data() {
        return{
            list: [],
            listLoading:false
        }
    },
    computed: {
        title() {
            let reslut;
            if(this.$route.params.type == 'normal') {
                reslut = '常见问题';
            }else if (this.$route.params.type == 'freshman'){
                reslut = '新手入门';
            }
            return reslut;
        }
    },
    watch: {
        'title': function() {
            this.getList();
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            let cid;
            if(this.$route.params.type == 'normal'){
                cid = 6;
            }
            if(this.$route.params.type == 'freshman'){
                cid = 7;
            }
            this.$http.get("/article/list?page=1&page_size=10&cid="+cid).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    this.list = res.list;
                    let that = this;
                    // this.list.forEach((element,index) => {
                    //     that.getAnswer(index,element.id);
                    // });
                }
            )
        },
        // getAnswer(index,id) {
        //     this.$http.get("/article?id="+id).then(
        //         response => {
        //             let res = response.data;
        //             let result = res.content;
        //             this.list[index].answer = res.content;
        //         }
        //     )
        // }
    },
    mounted() {
        this.getList();
    }
}