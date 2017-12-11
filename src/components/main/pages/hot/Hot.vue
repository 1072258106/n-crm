<template>
    <div class="hot">
        <div class="class item-container">
            <span class="title">分类：</span>
            <button type="primary" v-for="item in classList" :key="item.id" :class="item.id == chooseType ? 'btn choose-btn' : 'btn'" @click="chooseClass(item.id)">{{item.title}}</button>
        </div>

        <el-table :data="hotList" border style="width: 95%; margin:32px auto 0;" v-loading="hotLoading">
            <el-table-column prop="content" label="内容" min-width="250">
            </el-table-column>
            <el-table-column prop="use_count" label="使用人数" width="100" align="center">
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script src="./Hot.js">
</script>

<style lang="scss" scoped>
@import './Hot.scss';
</style>
