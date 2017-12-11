<template>
    <div class="change">
        <div class="change-box">
            <el-form label-width="160px">
                <el-form-item label="需要转换的地址：">
                    <el-row>
                        <el-col :span="14">
                            <el-input v-model="url"></el-input>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button type="primary" @click="change">转换</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="转换后的地址：" style="text-align:left;">
                    <span>{{res}}</span>
                </el-form-item>

                <el-form-item label="二维码：" style="text-align:left;">
                    <canvas id="canvas" height="170" width="170"></canvas>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'
    export default{
        data() {
            return {
                url:'',
                res:''
            }
        },
        methods: {
            change() {
                let postData = {
                    url: this.url
                }
                this.$http.post('/tools/taobao',postData).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.res = res.data.short_url;
                            //绘制二维码
                            let canvas = document.getElementById('canvas');
                            let opt = { errorCorrectionLevel: 'H', margin: 3 }
                            QRCode.toCanvas(canvas,  res.data.short_url, opt, function(error) {});
                        }else{
                            this.$message.error(res.message)
                        }
                    }
                )
            }
        }
    }
</script>
<style lang="scss" scoped>
    .change{
        position: relative;
        height: 100%;
        width: 100%;
    }
    .change-box{
        width: 750px;
    }
</style>
