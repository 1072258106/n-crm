<template>
    <div class="login">
        <div class="login-container">
            <h3 class="title">管理员登录</h3>
            <el-form label-width="100px" :model="loginData" :rules="rules" ref="form">
                <el-form-item label="账号：" prop="name">
                    <el-input v-model="loginData.name" @focus="keydown"></el-input>
                </el-form-item>
                <el-form-item type="password" label="密码：" prop="password">
                    <el-input v-model="loginData.password" type="password" @focus="keydown"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="verify">
                    <el-row>
                        <el-col :span="10">
                            <el-input v-model="loginData.code" @focus="keydown"></el-input>
                        </el-col>
                        <el-col :offset="1" :span="4" class="verify">
                            <img class="verify" @click="getVerify" :src="globalApi+'/system/kaptcha?t='+time+'&d='+random" />
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:500px;font-size:16px;letter-spacing:10px;" type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <footer>Copyright ©2017 All Rights Reserved. 杭州莫名科技有限公司</footer>
    </div>
</template>
<script src="./Login.js">
</script>
<style lang="scss" scoped>
@import './Login.scss';
</style>

