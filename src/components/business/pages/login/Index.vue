<template>
    <div class="login-page">
        <!-- <transition name="el-fade-in" mode="out-in">
            <router-view class="login-container"></router-view>
        </transition> -->
        <router-view class="login-container"></router-view>
    </div>
</template>
<style lang="scss" scoped>
.login-page{
    background: #f8f8f8;
    padding: 40px 0;
}
.login-container{
    border: 1px solid #ebebeb;
    background:#fff;
    border-radius: 10px;
}
</style>
