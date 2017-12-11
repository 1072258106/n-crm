export default {
    data(){
        return {
            filtering:false,
            header: {
                "Access-Token": this.$store.state.token
            },
            files:[],
            mobileType:{
                checkAll:true,
                isIndeterminate:false,
                options:['移动', '联通', '电信']

            },
            area:{
                checkAll:false,
                isIndeterminate:false,
                options:[]
            },
            search: {
                mobile_type:['移动', '联通', '电信'],
                area_id:[]
            },
            total:''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.globalApi + "/tools/mobile";
        },
        exportUrl() {
            return this.$store.state.globalApi + '/tools/mobile_export?token=' + this.$store.state.token;
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
                this.$message.error("上传手机号码文件只能是 Excel 或CSV 或TXT 格式!");
                return false;
            }
            if (!isLt5M) {
                this.$message.error("上传手机号码文件大小不能超过 5MB!");
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
            this.files.push(_file);
            return true;
        },
        //上传成功
        handleSuccess(response, file) {
            //修改原来的记录
            this.files.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(file.percentage);
                    array[index].number = file.response.data;
                    array[index].isProcessing = false;
                }
            }, file);
        },
        handleFail(err, file) {
            console.info("文件上传失败", err, file);
        },
        //上传过程中
        handlePro(event, file) {
            this.files.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(event.percent);
                }
            });
        },
        //全部删除文件
        deleteFile(isFirst) {
            this.$http
                .delete("/tools/mobile")
                .then(response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.files = [];
                        this.total = 0;
                    } 
                    if(isFirst != 'first'){
                        this.$message({
                            message: response.data.message,
                            type: response.data.code == 0 ? "success" : "error"
                        });
                    }
                });
        },
        // 开始筛选
        filters() {
            if (this.files.length === 0) {
                this.$message.warning("您还未上传手机号码");
                return;
            }
            this.filtering = true;
            let postData = {
                mobile_type: this.search.mobile_type,
                province: this.search.area_id
            }
            this.$http.post('/tools/mobile_filter', postData)
            .then(
                response => {
                    if (response.data.code == 0) {
                        let data = response.data.data;
                        this.total = data.total;
                        this.filtering = false;
                    } else {
                        this.filtering = false;
                        this.$message.error(response.data.message);
                    }
                }
            )
        },
        // 导出号码
        download(){
            let tempwindow = window.open('_blank');
            tempwindow.location = this.exportUrl;
        },
        // 运营商全选事件
        handleMobileTypeCheckAllChange(boolean,event) {
            this.search.mobile_type = event.target.checked ? this.mobileType.options : [];
            this.mobileType.isIndeterminate = false;
        },
        // 运营商手机号码选择事件
        handleMobileTypeChange(value) {
            let checkedCount = value.length;
            this.mobileType.checkAll = checkedCount === this.mobileType.options.length;
            this.mobileType.isIndeterminate = checkedCount > 0 && checkedCount < this.mobileType.options.length;
        },
        // 地区全选事件
        handleAreaCheckAllChange(boolean,event) {
            let allArea = [];
            if (event.target.checked) {
                this.area.options.forEach(function(value,index) {
                    allArea.push(value.area_id);
                });
            }
            
            //@todo 不选中是否筛选
            this.search.area_id = event.target.checked ? allArea : [];
            this.area.isIndeterminate = false;
        },
        // 地区选择事件
        handleAreaChange(value) {
            let checkedCount = value.length;
            this.area.checkAll = checkedCount == this.area.options.length;
            this.area.isIndeterminate = checkedCount > 0 && checkedCount < this.area.options.length;
        },
        // 获取地区
        getAreas() {
            let cityData = require('../../../../../../static/city.json');
            this.area.options = cityData;
            this.area.checkAll = true;
            let allArea = [];
            this.area.options.forEach(function(value,index) {
                allArea.push(value.area_id);
            });
            this.search.area_id = allArea;
        }
    },
    mounted(){
        this.getAreas();
        this.deleteFile('first');
    }
}