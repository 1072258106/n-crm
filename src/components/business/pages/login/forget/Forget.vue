<template>
    <div class="forget-container">
        <h3 class="title">忘记密码</h3>
        <el-form label-width="110px" :model="formData" :rules="rules" ref="form">
            <el-form-item label="手机：" prop="phone">
                <el-input v-model.number="formData.phone"></el-input>
            </el-form-item>
            
            <el-form-item label="验证码：" prop="verify">
                <el-row>
                    <el-col :span="10">
                        <el-input v-model="formData.verify"></el-input>
                    </el-col>
                    <el-col :offset="1" :span="4" class="verify">
                        <el-button type="text" @click="getVerify" v-if="!isVerify">获取验证码</el-button>
                        <el-button type="text" v-else disabled>重新获取 {{timeout}}S</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新密码：" prop="password">
                <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>

            <el-form-item label="确认新密码：" prop="checkPass">
                <el-input type="password" v-model="formData.checkPass"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button style="width:490px;font-size:16px;letter-spacing:10px;" type="primary" @click="submitForm">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./Forget.js">
</script>
<style lang="scss" scoped>
@import './Forget.scss';
</style>

