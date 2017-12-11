<template>
    <footer>
        <div class="detail">
            <el-row class="detail-container">
                <el-col :span="18" style="border-right:1px solid #ccc;">
                    <el-col :span="6">
                        <div class="title">产品服务</div>
                        <div class="item-container">
                            <router-link to="/serve/sale" class="item">营销短信</router-link>
                            <router-link to="/serve/notice" class="item">通知短信</router-link>
                            <router-link to="/serve/verify" class="item">验证码短信</router-link>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="title">行业案例</div>
                        <div class="item-container">
                            <router-link to="/case/online" class="item">电商</router-link>
                            <router-link to="/case/taobao" class="item">淘宝</router-link>
                            <router-link to="/case/wei" class="item">微商</router-link>
                            <router-link to="/case/super" class="item">商超</router-link>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="title">帮助中心</div>
                        <div class="item-container">
                            <router-link to="/help/normal" class="item">常见问题</router-link>
                            <router-link to="/help/freshman" class="item">新手入门</router-link>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="title">联系我们</div>
                        <div class="item-container">
                            <span>QQ：{{websiteInfo.company_qq}}</span>
                            <span>电话：{{websiteInfo.company_tel}}</span>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <img style="margin-left:32px;" src="../../../../../static/img/logo_03.png" alt="">
                </el-col>
            </el-row>
        </div>
        <div class="friend">
            <el-row class="friend-container">
                <div class="link">
                    <p class="title">友情链接</p>
                    <a v-for="(item,index) in friendsLink" :href="item.url" target="_blank" :key="index">{{item.title}}</a>
                </div>
            </el-row>
            <el-row class="copyright"> © 2017 杭州莫名科技有限公司 版权所有 浙ICP备1400125</el-row>
        </div>
    </footer>
</template>

<script src="./Footer.js">   
</script>

<style lang="scss" scoped>
    @import './Footer.scss';
</style>

