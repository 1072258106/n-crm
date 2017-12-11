<template>
    <div>
        <!-- 左侧的列表 -->
        <el-col :span="17" class="list-container" v-loading="listLoading" style="min-height:150px;">
            <ul>
                <li v-for="(item,index) in infoList" :key="index">
                    <img :src="item.pic" alt="">
                    <div class="right">
                        <h4>{{item.title}}</h4>
                        <div class="details">
                            <span class="name"><i class="icon iconfont icon-ren1"></i>&nbsp;{{item.author}}</span>
                            <span class="time"><i class="icon iconfont icon-shijian"></i>&nbsp;{{item.created_at}}</span>
                            <span class="watch"><i class="icon iconfont icon-yanjing"></i>&nbsp;{{item.click_num}}</span>
                        </div>
                        <p class="content">{{item.description}}...</p>
                        <router-link :to="{ path: $route.params.type+'/article', query: { id: item.id }}" exact class="more">阅读更多</router-link>
                        <!-- <a :href="item.href" class="more">阅读更多</a> -->
                    </div>
                </li>
            </ul>
            <el-pagination class="page"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="infoList.length">
            </el-pagination>
        </el-col>
        <!-- 右侧的新闻 -->
        <el-col :span="5" :offset="2">
            <v-news :title="'短信平台'" :cid="8"></v-news>
            <v-news :title="'行业动态'" :cid="5"></v-news>
        </el-col>
    </div>
</template>
<script src="./List.js">
</script>
<style lang="scss" scoped>
@import './List.scss';
</style>

