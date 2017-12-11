import Vue from 'vue';
export default{
    data() {
        return {
            loginData:{
                name:'',
                password: '',
                code: ''
            },
            verifySrc: '',
            random: 0,
            globalApi:this.$store.state.globalApi,
            time:'',
            rules: {
                name: [
                   { type: 'number',required: true, message: '请输入QQ或者手机号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
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
            this.$http.post("/system/login?t="+this.time, this.loginData).then(
                response => {
                    let res = response.data;
                    if(res.code == 0){
                        this.$store.commit("setToken", res.data.access_token);
                        Vue.cookie.set('Access-Token', res.data.access_token);
                        console.log('token',this.$store.state.token)
                        this.$router.push('/main');
                    }else{
                        this.$message.error(res.message);
                    }
                }
            );
        },
        submitForm() {
            console.log(typeof(parseInt(this.loginData.name)),parseInt(this.loginData.name))
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