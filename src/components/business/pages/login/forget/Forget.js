export default{
    data() {
        return{
            formData: {
                phone: '',
                verify: '',
                password: '',
                checkPass: ''
            },
            rules: {
                phone: [
                    {required: true, type: 'number', message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: this.phone, trigger: 'blur' }
                ],
                verify: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.check, trigger: 'blur' }
                ],
            },
            timeout: 90,
            isVerify: false
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.resetPassword();
              } else {
                this.$message.error('提交错误');
                return false;
              }
            });
        },
        resetPassword() {
            let code = this.formData.phone + '';
            let postData = {
                "mobile":code,
                "code": this.formData.verify,
                "password": this.formData.password
            }
            this.$http.post('/user/find_password',postData).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.$router('/login');
                    }else{
                        this.$message.error(res.message);
                    }
                }
            )
        },
        check(rule, value, callback) {
            if (value === '') {
                  callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        phone(rule, value, callback) {
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        },
        getVerify() {
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.formData.phone)) {
                this.$message.error('请输入正确的手机号');
                return;
            } 
            this.isVerify = true;
            let that = this;
            let timer = setInterval(function() {
                that.timeout--;
                if(that.timeout == 0) {
                    that.isVerify = true;
                    clearInterval(timer)
                }
            },1000)
            this.$http.get('/user/send_code?mobile='+this.formData.phone).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.$message({
                            message: '发送成功',
                            type:  "success"
                        });
                    }
                }
            )
        }
    }
}