<template>
    <div class="admin-main">
        <!-- 顶部 -->
        <header class="header">
            <h2 class="logo">
                <img src="../../../static/img/logo_03.png" alt="">
            </h2>
            <div class="header-content">
                <!-- <div class="kefu item">
                    <el-button type="text">联系客服</el-button>
                    <i class="icon iconfont icon-qq1"></i> 
                </div>
                <div class="info item">
                    <span class="message">短信：</span>
                    <span class="message-count">{{info.sms}}</span>
                    <span class="line"></span>
                    <router-link class="btn-text recharge" to="/main/recharge">充值</router-link>
                </div> -->
                <div class="user item" style="margin-right:100px;">
                    <span>{{info.nick}}</span>
                    <span class="line"></span>
                    <el-button type="text" @click="logout">退出</el-button>
                </div>
            </div>
        </header>
        <!-- 左侧导航 -->
        <div class="nav-container">
            <el-menu router
                :default-active="activeNow"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/admin">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/notice">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/channel">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">签名管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/article">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">文章管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/activity">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">活动管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/hot">
                    <i class="icon iconfont icon-duanxinqunfajilu"></i>
                    <span slot="title">热门短信</span>
                </el-menu-item>
                <el-submenu index="/admin/system">
                    <template slot="title">
                        <i class="icon iconfont icon-duanxinqunfajilu"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item index="/admin/system/info">网站信息</el-menu-item>
                    <el-menu-item index="/admin/system/link">友情链接</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <!-- 右侧内容 -->
        <!-- <transition name="el-fade-in" mode="out-in">
            <router-view class="router-container"></router-view>
        </transition> -->
        <router-view class="router-container"></router-view>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                info: {}
            }
        },
        computed: {
            activeNow() {
                let result;
                if(this.$route.matched.length > 3) {
                    result = this.$route.matched[2].path;
                }else{
                    result = this.$route.fullPath;
                }
                if(this.$route.fullPath.indexOf('/article_list') >= 0){
                    result = '/admin/article'
                }
                return result;
            }
        },
        methods: {
            getInfo() {
                this.$http.get('/user/info').then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            this.info = res.data;
                            console.log('header',this.info)
                        }
                    }
                )
            },
            logout() {
                this.$store.commit("setAdminToken", '');
                this.$cookie.delete("adminToken");
                this.$router.push('/admin_login');
            }
        },
        mounted() {
            this.getInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .admin-main{
        padding-left: 160px;
        padding-top: 64px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #f8f8f8;
        .nav-container{
            width: 160px;
            position: fixed;
            top: 64px;
            left: 0;
            height: 100%;
            background:#545c64;
            .el-menu{
                border: none;
                .el-submenu .el-menu-item{
                    min-width:50px;
                }
            }
        }
    }
    .router-container{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 24px;
        overflow-y: auto;
    }

    .header{
        position: fixed;
        top:0;
        left: 0;
        height: 64px;
        width: 100%;
        border-bottom:1px solid #e4e4e4;
        font-size: 14px;
        box-sizing: border-box;
        .logo{
            float: left;
            padding:8px;
            img{
                height: 48px;
            }
        }
        .header-content{
            float: right;
            height: 100%;
            .item{
                float: right;
                padding: 0 12px;
                height: 100%;
                line-height: 64px;
                .line{
                    vertical-align: middle;
                    height: 25px;
                    border-left:1px solid #e4e4e4;
                    margin:0 8px;
                }
            }
            .info{
                border-left:1px solid #e4e4e4;
                border-right:1px solid #e4e4e4;
            }
            .kefu{
                .icon{
                    font-size: 32px;
                    color:#4cafe9;
                    line-height: 54px;
                }
            }
        }
    }
</style>
