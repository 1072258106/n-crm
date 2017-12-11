<template>
    <div class="article">
        <el-col :span="17" class="article-container">
            <h3 class="title">{{article.title}}</h3>
            <div class="details">
                <span class="name"><i class="icon iconfont icon-ren1"></i>&nbsp;{{article.author}}</span>
                <span class="time"><i class="icon iconfont icon-shijian"></i>&nbsp;{{article.created_at}}</span>
                <span class="watch"><i class="icon iconfont icon-yanjing"></i>&nbsp;{{article.click_num}}</span>
            </div>
            <div class="content article-content" v-html="article.content">
            </div>
        </el-col> 
        <!-- 右侧的新闻 -->
        <el-col :span="5" :offset="2">
            <v-news :title="'最新热文'" :cid="0"></v-news>
        </el-col>
    </div>
</template>
<script src="./Article.js">
</script>
<style lang="scss" scoped>
@import './Article.scss';
</style>
