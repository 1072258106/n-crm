<template> 
    <div class="register-container">
        <h3 class="title">免费注册</h3>
        <el-form label-width="100px" :model="registerData" :rules="rules" ref="form">
            <el-form-item label="手机：" prop="phone">
                <el-input v-model.number="registerData.phone"></el-input>
            </el-form-item>
            <el-form-item label="QQ：" prop="qq">
                <el-input v-model.number="registerData.qq"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="name">
                <el-input v-model.number="registerData.name"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="registerData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input v-model="registerData.checkPass" type="password"></el-input>
            </el-form-item>
            <el-form-item  class="protocol" prop="agree">
                <el-checkbox v-model="registerData.agree" label="1">我已阅读并同意</el-checkbox><router-link target="_blank" to="/protocol">《牛百发服务条款》</router-link>
            </el-form-item>
            <el-form-item>
                <el-button style="width:500px;font-size:16px;letter-spacing:10px;" type="primary" @click="submitForm">立即注册</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script src="./Register.js">
</script>
<style lang="scss" scoped>
    @import './Register.scss';
</style>

