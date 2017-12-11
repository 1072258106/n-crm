<template>
    <div class="container">
        <!-- banner图 -->
        <v-banner :pic="'case-banner.jpg'" title="行业案例" text="Industry Cases"></v-banner>
        <el-row class="case-container">
            <el-col :span="17" class="case-main">
                <el-menu :default-active="activeIndex" mode="horizontal" router>
                    <el-menu-item index="/case/online">电商</el-menu-item>
                    <el-menu-item index="/case/taobao">淘宝</el-menu-item>
                    <el-menu-item index="/case/wei">微商</el-menu-item>
                    <el-menu-item index="/case/super">商超</el-menu-item>
                </el-menu>
                <el-row  class="case-list" v-loading="listLoading">
                    <el-col class="case-item" :span="8" v-for="(item,index) in caseList" :key="index">
                        <!-- <div class="img-box" :style="'background-image:url(' + item.pic + ')'"></div> -->
                        <router-link :to="'/info/a/article?id='+item.id">
                            <img :src="globalApi+item.pic" alt="" onerror="javascript:this.src='/static/img/moren.jpg'" height="150" width="220">
                            <p>{{item.title}}</p>
                        </router-link>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="5" :offset="2">
                <v-news :title="'最受欢迎'" :cid="0"></v-news>
                <v-news :title="'行业动态'" :cid="5"></v-news>
            </el-col>
        </el-row>
    </div>
</template>
<script src="./Index.js"></script>
<style lang="scss" scoped>
    @import './Index.scss';
</style>

