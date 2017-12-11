export default{
    data() {
        return {
            registerData:{
                qq: '',
                phone: '',
                name: '',
                password: '',
                checkPass:'',
                isAgree: false,
                agree: []
            },
            rules: {
                qq: [
                  {required: true, type: 'number', message: '请输入正确的QQ号', trigger: 'blur' }
                ],
                phone: [
                    {required: true, type: 'number', message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: this.phone, trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.check, trigger: 'blur' }
                ],
                agree: [
                    { type: 'array', required: true, message: '请先阅读并同意服务条款', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        submitForm() {
            console.log(this.registerData.agree)
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.register();
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        register() {
            let postData = {
                "mobile": this.registerData.phone,
                "qq": this.registerData.qq,
                "password": this.registerData.password,
                "nick": this.registerData.name
            };
            
            this.$http.post("/user/sign_up", postData).then(
                response => {
                    let res = response.data;
                    if(res.code == 1){
                        this.$alert('注册成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$store.commit("setToken", res.data.token);
                                this.$router.push('/main')
                            }
                        });
                    }else{
                        this.$message.error(res.message);
                    }
                }
            );
        },
        phone(rule, value, callback) {
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        },
        check(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerData.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
    }
}