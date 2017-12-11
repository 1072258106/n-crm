import Banner from '../../common/banner/Banner.vue';
import News from '../../common/newsbox/Index.vue';
export default{
    components: {
        'v-banner':Banner,
        'v-news': News
    },
    data() {
        return {
            caseList:[],
            listLoading:false,
            globalApi: this.$store.state.globalApi
        }
    },
    computed: {
        activeIndex() {
            return '/case/' + this.$route.params.type;
        },
        cid() {
            let result;
            if(this.$route.params.type == 'online') {
                result = 1;
            }
            if(this.$route.params.type == 'taobao') {
                result = 2;
            }
            if(this.$route.params.type == 'wei') {
                result = 3;
            }
            if(this.$route.params.type == 'super') {
                result = 4;
            }
            return result;
        }
    },
    watch: {
        'cid': function() {
            this.getCaseList();
        }
    },
    methods: {
        getCaseList() {
            this.listLoading = true;
            this.$http.get("/article/list?page=1&page_size=10&cid="+this.cid).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    this.caseList = res.list;
                }
            )
        },
        detail(id) {
            this.$router.push('/info/a/article?id='+id);
        }
    },
    mounted() {
        this.getCaseList();
    }
}