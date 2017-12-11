import Vue from 'vue';
export default{
    data() {
        return{
            search:{
            },
            tableData: [
                
            ],
            userChange: {
                id:0,
                sms:0,
                note: ''
            },
            userChangeVisible: false,
            search:{
                page:1,
                pageSize:10,
                nick: '',
                qq: '',
                mobile:''
            },
            listLoading:false,
            total:0
        }
    },
    methods: {
        searchList() {
            console.log('search')
        },
        showUserChange(id) {
            this.userChangeVisible = true;
            this.userChange = {
                user_id:id,
                sms:0,
                note: ''
            }
        },
        changeUser() {
            this.$http.post('/admin/user/give',this.userChange).then(
                response => {
                    let res = response.data;
                    if(res.code == 0){
                        this.userChangeVisible = false;
                        this.getUserList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        getUserList() {
            this.listLoading = true;
            let params = {
                page_size: this.search.pageSize,
                page: this.search.page,
            }
            if(this.search.nick) {
                params.nick = this.search.nick;
            }
            if(this.search.qq) {
                params.qq = this.search.qq;
            }
            if(this.search.mobile) {
                params.mobile = this.search.mobile;
            }
            this.$http.get('/admin/user/list',{
                params
            }).then(
                response => {
                    this.listLoading = false;
                    let res = response.data;
                    this.tableData = res.list;
                    this.total = res.total;
                }
            )
        },
        enter(token) {
            this.$store.commit("setToken", token);
            Vue.cookie.set('Access-Token', token);
            let tempwindow = window.open('_blank');
            tempwindow.location = '/main';
        }
        
    },
    mounted() {
        this.getUserList();
    }
}