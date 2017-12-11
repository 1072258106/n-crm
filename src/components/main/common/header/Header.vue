<template>
    <header class="header">
        <h2 class="logo">
            <img src="../../../../../static/img/logo_03.png" alt="">
        </h2>
        <div class="header-content">
            <div class="bread">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :key="b.meta.name" :to="{path: b.path}" v-for="b in breads" >{{b.meta.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="kefu item">
                <el-button type="text">联系客服</el-button>
                <i class="icon iconfont icon-qq1"></i> 
            </div>
            <div class="info item">
                <span class="message">短信：</span>
                <span class="message-count">{{info.sms}}</span>
                <span class="line"></span>
                <router-link class="btn-text recharge" to="/main/recharge">充值</router-link>
            </div>
            <div class="user item">
                <span>{{info.nick}}</span>
                <span class="line"></span>
                <el-button type="text" @click="logout">退出</el-button>
            </div>
        </div>
    </header>
</template>

<script src="./Header.js">
</script>

<style lang="scss" scoped>
@import './Header.scss';
</style>

