export default{
    data() {
        return {
            infoList: [
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                },
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                },
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                },
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                },
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                },
                {
                    "href": "javascript:;",
                    "text": "营销短信群发、加群短信群发，还有未来吗？..."
                }
            ],
            
            hangyeList: [],
            messageList: [],
            nationList: []
        }
    },
    methods: {
        getHangyeList() {
            this.$http.get('/article/list?page=1&page_size=10&cid=5').then(
                response => {
                    let res = response.data;
                    this.hangyeList = res.list;
                }
            )
        },
        getMessageList() {
            this.$http.get('/article/list?page=1&page_size=10&cid=8').then(
                response => {
                    let res = response.data;
                    this.messageList = res.list;
                }
            )
        },
        getNationList() {
            this.$http.get('/article/list?page=1&page_size=10&cid=9').then(
                response => {
                    let res = response.data;
                    this.nationList = res.list;
                }
            )
        }
    },
    mounted() {
        this.getHangyeList()
        this.getMessageList()
        this.getNationList()
    }
}