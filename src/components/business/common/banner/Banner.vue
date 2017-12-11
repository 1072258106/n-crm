<template>
    <div>
        <!-- banner图 -->
        <el-row class="small-banner" :style="'background-image:url(../../../../../static/img/'+pic">
            <div class="title">
                <h4>{{title}}</h4>
                <p>{{text}}</p>
            </div>
        </el-row>
    </div>
</template>

<script src="./Banner.js">    
</script>

<style lang="scss" scoped>
@import './Banner.scss'
</style>

