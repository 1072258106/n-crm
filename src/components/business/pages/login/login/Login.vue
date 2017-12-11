<template>
    <div class="login-container">
        <h3 class="title">平台登录</h3>
        <el-form label-width="100px" :model="loginData" :rules="rules" ref="form">
            <el-form-item label="QQ/手机：" prop="name">
                <el-input v-model.number="loginData.name" @focus="keydown"></el-input>
            </el-form-item>
            <el-form-item type="password" label="密码：" prop="password">
                <el-input type="password" v-model="loginData.password" @focus="keydown"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
                <el-row>
                    <el-col :span="10">
                        <el-input v-model="loginData.code" @focus="keydown"></el-input>
                    </el-col>
                    <el-col :offset="1" :span="4">
                        <img class="verify" @click="getVerify" :src="globalApi+'/system/kaptcha?t='+time+'&d='+random" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item  class="forget">
                <router-link to="/login/forget">忘记密码？</router-link>
            </el-form-item>
            <el-form-item>
                <el-button style="width:500px;font-size:16px;letter-spacing:10px;" type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./Login.js">
</script>
<style lang="scss" scoped>
@import './Login.scss';
</style>

