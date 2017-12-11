<template>
    <div class="info">
        <div class="form-container">
            <el-form label-position="right" label-width="140px" :model="info" class="form">
                <el-form-item label="公司名称：">
                    <el-input v-model="info.company_name"></el-input>
                </el-form-item>
                <el-form-item label="网站名称：">
                    <el-input v-model="info.title"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="info.company_tel"></el-input>
                </el-form-item>
                <el-form-item label="传真：">
                    <el-input v-model="info.company_fax"></el-input>
                </el-form-item>
                <el-form-item label="QQ：">
                    <el-input v-model="info.company_qq"></el-input>
                </el-form-item>
                <el-form-item label="Email：">
                    <el-input v-model="info.company_email"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                    <el-input v-model="info.company_address"></el-input>
                </el-form-item>
                <el-form-item label="网址：">
                    <el-input v-model="info.company_url"></el-input>
                </el-form-item>
                <el-form-item label="备案号：">
                    <el-input v-model="info.icp"></el-input>
                </el-form-item>
                <el-form-item label="关键词：">
                    <el-input type="textarea" v-model="info.keyword"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input type="textarea" v-model="info.description"></el-input>
                </el-form-item>
                <el-form-item label="微信公众号二维码：">
                    <img :src="globalApi+info.weixinewm" :alt="globalApi+info.weixinewm" height="50" width="50" >
                    <el-upload class="upload-demo"
                        :action="globalApi + '/tools/image_upload'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :headers="header"
                        v-model="info.erweima"
                        :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeInfo">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script src="./Info.js">
</script>

<style lang="scss" scoped>
@import './Info.scss';
</style>

