import Vue from 'vue';
export default{
    data() {
        return {
            loginData:{
                name:'',
                password: '',
                code: ''
            },
            rules: {
                name: [
                   { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            globalApi:this.$store.state.globalApi,
            random:0,
            time:''
        }
    },
    methods:{
        keydown() {
            let that = this;
            document.onkeyup = function(ev) {
                if(ev.keyCode == 13) {
                    that.submitForm();
                }
            }
        },
        login() {
            this.$http.post('/system/admin_login?t='+this.time,this.loginData).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.$store.commit("setAdminToken", res.data.access_token);
                        Vue.cookie.set('adminToken', res.data.access_token);
                        this.$router.push('/admin');
                    }else{
                        this.$message.error(res.message);
                    }
                }
            )
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.login();
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        getVerify() {
            this.random = Math.random() * 100;
        }
    },
    mounted() {
        this.time = Date.parse(new Date);
    }
}