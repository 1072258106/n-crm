export default{
    data(){
        return{
            userInfo: this.$store.state.userInfo,
            userLoading:false,
            pathList: [
                {
                    icon: 'icon-tongzhi',
                    text: '短信群发',
                    path: '/main/message/normal',
                    background: '#49a9ee'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '变量短信',
                    path: '/main/message/variable',
                    background: '#98d87d'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '发送记录',
                    path: '/main/message/record',
                    background: '#f27b71'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '手机号码筛选',
                    path: '/main/tools/phone_split',
                    background: '#8996e7'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '手机网页制作',
                    path: '/main/tools/h5',
                    background: '#ff6699'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '热门短信',
                    path: '/main/hot',
                    background: '#98c0ff'
                },
                {
                    icon: 'icon-tongzhi',
                    text: '短信充值',
                    path: '/main/recharge',
                    background: '#54beb6'
                },
            ],
            anList: [],
            gonggaoLoading:false,
            noticeTitle: '',//公告标题
            message: '',//公告信息
            dialogVisible: false,
            hotList: [],
            hotLoading:false,
            total: {
                today:{},
                all:{},
                yesterday:{}
            },
            totalLoading:false,
            infoVisible: false,
            passVisible: false,
            password: {
                old_password:'',
                new_password: ''
            },
            changeInfo: {
                qq: '',
                nick: ''
            },
            modifyType:1,
            checkPass:''
        }
    },
    methods: {
        getTotal() {
            this.totalLoading = true;
            this.$http.get("/system/total").then(
                response => {
                    this.totalLoading = false;
                    let res = response.data;
                    this.total = res;
                }
            )
        },
        getGonggaoList() {
            this.gonggaoLoading = true;
            this.$http.get("/system/notice/list?page=1&page_size=6").then(
                response => {
                    this.gonggaoLoading = false;
                    let res = response.data;
                    this.anList = res.data.list;
                }
            )
        },
        showGonggao(id) {
            this.dialogVisible = true;
            this.$http.get("/system/notice?id=" + id).then(
                response => {
                    let res = response.data;
                    this.message = res.data.content;
                    this.noticeTitle = res.data.title;
                }
            )
        },
        getHotList() {
            this.hotLoading = true;
            this.$http.get("/system/template/list").then(
                response => {
                    this.hotLoading = false;
                    let res = response.data;
                    this.hotList = res.data.list;
                }
            )
        },
        getUserInfo() {
            this.$http.get("/user/info").then(
                response => {
                    let res = response.data;
                    this.userInfo = res.data;
                    this.changeInfo.qq = res.data.qq;
                    this.changeInfo.nick = res.data.nick;
                    console.log(this.changeInfo)
                }
            )
        },
        modifyInfo(type) {
            this.modifyType = type;
            this.infoVisible = true;
        },
        modifyPass() {
            if(this.checkPass != this.password.new_password) {
                this.$message.error('两次密码输入不一致');
                return;
            }
            this.$http.post('/user/password',this.password).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.passVisible = false;
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )

        },
        updateInfo() {
            this.userLoading = true;
            this.$http.post('/user/update',this.changeInfo).then(
                response => {
                    this.hotLoading = false;
                    let res = response.data;
                    if(res.code == 0) {
                        this.infoVisible = false;
                        this.getUserInfo();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        check(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.password.new_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
    },
    mounted() {
        this.getTotal();
        this.getGonggaoList();
        this.getHotList();
        this.getUserInfo();
    }
}