import News from '../../../common/newsbox/Index.vue';
export default{
    components: {
        'v-news': News
    },
    data() {
        return {
            infoList: [],//左侧营销资讯的列表
            listLoading:false,
            list1: [//右侧新闻列表
            ],
            list2: [//右侧新闻列表
            ],
        }
    },
    methods: {
        getInfoList() {
            this.listLoading = true;
            let cid;
            console.log(this.$route)
            if(this.$route.params.type == 'movement') {
                cid = 5;
            }
            if(this.$route.params.type == 'platform') {
                cid = 8;
            }
            if(this.$route.params.type == 'international') {
                cid = 9;
            }
            this.$http.get("/article/list?page=1&page_size=10&cid="+cid).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    this.infoList = res.list;
                }
            )
        }
    },
    mounted() {
        this.getInfoList();
    },
    watch: {
        '$route': function() {
            this.getInfoList();
        }
    }
}