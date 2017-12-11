<template>
    <nav :class="isCollapse ? 'nav nav-collapse' : 'nav'">
        <div @click="switchs" :class="isCollapse ? 'switch-tab collapse-tab' : 'switch-tab'">
            <i :class="'icon iconfont '+switchIcon"></i>
        </div>
        <el-menu  :default-active="activeNow"  @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#2a2d32"
        text-color="#989898"
        active-text-color="#fff"
        router>

            <el-menu-item index="/main">
                <i class="icon iconfont icon-shouye"></i>
                <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="/main/message">
                <template slot="title">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">短信群发</span>
                </template>
                <el-menu-item index="/main/message/normal">普通短信</el-menu-item>
                <el-menu-item index="/main/message/variable">变量短信</el-menu-item>
                <el-menu-item index="/main/message/record">发送记录</el-menu-item>
            </el-submenu>

            

            <el-submenu index="/main/tools">
                <template slot="title">
                    <i class="icon iconfont icon-gongju"></i>
                    <span slot="title">实用工具</span>
                </template>
                <el-menu-item index="/main/tools/h5">手机网页制作</el-menu-item>
                <el-menu-item index="/main/tools/phone_split">手机号码筛选</el-menu-item>
                <el-menu-item index="/main/tools/change">微信转淘宝</el-menu-item>
            </el-submenu>

            <el-menu-item index="/main/hot">
                <i class="icon iconfont icon-remen"></i>
                <span slot="title">热门短信</span>
            </el-menu-item>

            <el-menu-item index="/main/api">
                <i class="icon iconfont icon-jiekou1"></i>
                <span slot="title">Api接口</span>
            </el-menu-item>

            <el-menu-item index="/main/problem">
                <i class="icon iconfont icon-changjianwenti"></i>
                <span slot="title">常见问题</span>
            </el-menu-item>

            <el-menu-item index="/main/recharge">
                <i class="icon iconfont icon-chongzhi"></i>
                <span slot="title">充值中心</span>
            </el-menu-item>
        </el-menu>
    </nav>
</template>
<script src="./Nav.js">
</script>
<style lang="scss" scoped>
@import './Nav.scss';
</style>
