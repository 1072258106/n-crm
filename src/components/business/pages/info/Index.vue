<template>
    <div class="info container">
        <!-- banner图 -->
        <v-banner title="营销资讯" text="Marketing Information" :pic="'banner-info.jpg'"></v-banner>
        <!-- 主要内容 -->
        <el-row class="info-container">
            <!-- <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
            </transition> -->
            <router-view></router-view>
        </el-row>
    </div>
</template>
<script src="./Index.js">
</script>
<style lang="scss" scoped>
@import './Index.scss';
</style>
