import News from '../../../common/newsbox/Index.vue';
export default{
    components: {
        'v-news': News
    },
    data() {
        return {
            list1: [],//右侧新闻列表
            articleId: this.$route.query.id,
            article: {

            }
        }
    },
    watch:{
        '$route': function(){
            this.getArticle();
            this.articleId = this.$route.query.id;
        }
    },
    methods: {
        getArticle() {
            this.$http.get("/article?id="+this.articleId).then(
                response => {
                    let res = response.data;
                    this.article = res;
                    this.article.created_at = this.article.created_at.substring(0,11);
                }
            )
        }
    },
    mounted() {
        this.getArticle();
    }
}