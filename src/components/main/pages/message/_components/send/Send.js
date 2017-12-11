import vInput from "../input/Input";
export default{
    components: {
        vInput
    },
    data() {
        return {
            header: {
                "Access-Token": this.$store.state.token
            },
            globalApi: this.$store.state.globalApi,
            sendDisable:false,//按钮默认有效，点击发送后失效
            sendMethod: 1,
            userFiles: [],
            total: 0,
            width: 0,
            title: '',
            signName: '',
            signValue:0,
            signList: [],
            content: '',
            blackWords: [],
            sendMethod: 1,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            sendTime: '',
            insertShortVisible: false,
            longLink:'',
            applySignValue: '',
            applySignVisible: false
        };
    },
    computed:{
        uploadData() {
            return {
                type: this.sendType
            }
        },
        previewContent() {//展示的内容
            return "【" + this.signName + "】" + this.content + " 回复T退订";
        },
        messageList() {//展示的内容
            let content = "【" + this.signName + "】" + this.content + " 回复T退订";
            let result = [];
            for(var i = 0;i<this.section;i++){
                result.push(content.substring(i*70,(i+1)*70-1))
            }
            return result;
        },
          
        //字数
        words() {
            return this.previewContent.length;
        },
        //条数
        section() {
            return this.words > 70 ? Math.ceil(this.words / 67) : 1;
        }
    },
    props: {
        sendType: {
            type: Number
        }
    },
    methods: {
        //判断是否符合上传条件
        beforeUpload(file) {
            const isExcel = file.type === "application/vnd.ms-excel";
            const isNewExcel =
                file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const isCSV = file.type === "text/csv";
            const isTXT = file.type === "text/plain";
            const isLt5M = file.size / 1024 / 1024 < 50;
            if (!isExcel && !isNewExcel && !isCSV && !isTXT) {
                this.$message.error("上传手机号码文件只能是 Excel 或CSV格式!");
                return false;
            }
            if (!isLt5M) {
                this.$message.error("上传手机号码文件大小不能超过 50MB!");
                return false;
            }
            // 添加上传的文件
            const _file = {
                uid: file.uid,
                name: file.name,
                percentage: 0,
                isProcessing:true,
                number: 0
            };
            this.userFiles.push(_file);
            return true;
        },
        //上传成功
        handleSuccess(response, file) {
            //修改原来的记录
            this.userFiles.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(file.percentage);
                    array[index].number = file.response.data.mobile;
                    array[index].isProcessing = false;
                }
            }, file);
            this.total = file.response.data.total;
        },
        handleFail(err, file) {
            console.info("文件上传失败", err, file);
        },
        //上传过程中
        handlePro(event, file) {
            console.info("ev:", event, file);
            this.userFiles.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(event.percent);
                    if(array[index].percentage == 100) {
                        return;
                    }
                }
            });
        },
        //全部删除文件
        deleteAll(isFirst) {
            this.$http.get("/active/remove").then(
                 response => {
                    let  res = response.data;
                    if(isFirst != 'first'){
                        if(res.code == 0) {
                            this.userFiles = [];
                            this.total = 0;
                            console
                        }
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                });
        },
        //输入号码成功
        handleInputSuccess(data) {
            this.userFiles.push(data.file);
            this.total = data.total;
        },
        handleSignSelected(val) {
            let that = this;
            this.signList.forEach(element => {
                if(element.id == val){
                    that.signName = element.label;
                }
            });
        },
        send(){//确认发送
            if(!this.content) {
                this.$message.error('短信内容不能为空');
                return;
            }
            if(this.total == 0) {
                this.$message.error('请先上传或输入手机号');
                return;
            }
            this.sendDisable = true;
            let postData = {
                "name":this.title,
                "type":this.sendType,
                "content":this.content,
                "sign":this.signValue,
                "send_time": this.sendTime ? this.sendTime : this.changeTime("yyyy-MM-dd hh:mm:ss")
            }
            
            this.$http.post('/active/create',postData).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.$router.push('/main/message/record')
                    }else{
                        this.sendDisable = false;
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        timeSelected(value) {
            if (Date.parse(this.sendTime) < Date.parse(new Date())) {
                this.$message.error("请选择比现在更迟的时间");
                this.sendTime = "";
                return;
            }
            console.log(value)
            this.sendTime = value;
            console.log(this.sendTime)
        },
        insertVariable(str) {//插入变量
            let obj = document.getElementById('textarea');
            var len = obj.selectionStart;
            this.content = this.content.substring(0, len) + ' ' +  str  + ' ' + this.content.substring(len);
        },
        insertShort() {//插入短链
            let postData = {
                url: this.longLink
            }
            this.$http.post('/tools/short_url',postData).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.insertShortVisible = false;
                        this.insertVariable(res.data)
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        getSignList() {//获取签名列表
            this.$http.get('/active/sign').then(
                response => {
                    let res = response.data;
                    this.signList = res.list;
                    this.signName = res.list[0].label
                    this.signValue = res.list[0].id
                    res.list.forEach(element => {
                        if(element.userId) {
                            this.signName = element.label;
                            this.signValue = element.id;
                        }
                    });
                }
            )
        },
        applySign() {
            let postData = {
                sign: this.applySignValue
            }
            this.$http.post('/active/cus_sign',postData).then(
                response => {
                    if(response.data.code == 0){
                        this.applySignVisible = false;
                        this.getSignList();
                    }
                    this.$message({
                        message: response.data.message,
                        type: response.data.code == 0 ? "success" : "error"
                    });
                }
            )
        },
        changeTime(fmt) { //author: meizz
            let newDate = new Date(); 
            var o = {
                "M+": newDate.getMonth() + 1, //月份 
                "d+": newDate.getDate(), //日 
                "h+": newDate.getHours(), //小时 
                "m+": newDate.getMinutes(), //分 
                "s+": newDate.getSeconds(), //秒 
                "q+": Math.floor((newDate.getMonth() + 3) / 3), //季度 
                "S": newDate.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        getAgainInfo() {
            this.$http.get('/active/detail?id='+this.$route.query.id).then(
                response => {
                    let res = response.data;
                    if(res.code == 0) {
                        this.title = res.data.name;
                        this.content = res.data.content;
                        this.signValue = res.data.sign;
                    }
                }
            )
        }
    }, 
    mounted() {
        this.deleteAll('first');//进入页面先删除所有号码
        this.getSignList();
        if(this.$route.query.id){
            this.getAgainInfo();
        }
    }
}