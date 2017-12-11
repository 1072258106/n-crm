<template>
    <div>
        <!-- banner图 -->
         <v-banner :pic="'banner-'+type+'.jpg'" :title="title" :text="'产品服务'"></v-banner>
        <!-- info -->
        <el-row class="info">
            <el-row class="info-container">
                <el-col :span="8">
                    <div class="content">
                        <span class="icon-box"><i :class="'icon iconfont '+info[0].icon"></i></span>
                        <div class="text">{{info[0].text}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="content">
                        <span class="icon-box"><i :class="'icon iconfont '+info[0].icon"></i></span>
                        <div class="text">{{info[0].text}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="content">
                        <span class="icon-box"><i :class="'icon iconfont '+info[0].icon"></i></span>
                        <div class="text">{{info[0].text}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <!-- 功能及特点 -->
        <el-row class="features">
            <h3 class="item-title">功能及特点</h3>
            <el-row class="content">
                <span class="icon-box">
                    <i :class="'icon iconfont '+features.icon"></i>
                </span>
                <ul class="list-1">
                    <li v-for="(item,index) in features.list" :key="index" v-if="index <= 4">
                        <i class="icon iconfont icon-dian-copy-copy"></i>
                        {{item}}
                    </li>
                </ul>
                <ul class="list-2">
                    <li v-for="(item,index) in features.list" :key="index" v-if="index > 4 && index <= 9">
                        <i class="icon iconfont icon-dian-copy-copy"></i>
                        {{item}}
                    </li>
                </ul>
            </el-row>
        </el-row>

        <!-- 短信优势 -->
        <el-row class="advantage">
            <h3 class="item-title">短信优势</h3>
            <div class="content">
                <el-row type="flex" justify="space-around">
                    <el-col :span="6" class="icon-1">
                        <dl>
                            <dt></dt>
                            <dd>106三网合一通道</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6" class="icon-2">
                        <dl>
                            <dt></dt>
                            <dd>最低4.3分/条</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6" class="icon-3">
                        <dl>
                            <dt></dt>
                            <dd>到达率96%以上</dd>
                        </dl>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="6" class="icon-4">
                        <dl>
                            <dt></dt>
                            <dd>专业防360拦截</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6" class="icon-5">
                        <dl>
                            <dt></dt>
                            <dd>支持自定义手机网页</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6" class="icon-6">
                        <dl>
                            <dt></dt>
                            <dd>精确的效果统计</dd>
                        </dl>
                    </el-col>
                </el-row>
            </div>
        </el-row>
    </div>
</template>
<script src="./Index.js"></script>
<style lang="scss" scoped>
@import './Index.scss';
</style>

