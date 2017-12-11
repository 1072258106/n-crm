<template>
    <div class="news-container">
        <h4>{{title}}</h4>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="goTo(item.id)">
                <!-- <span class="recommend">推荐</span> -->
                <span class="content">{{item.title}}</span>
                <span class="count">{{item.click_num}}次</span>
            </li>
        </ul>
    </div>
</template>
<script src="./Index.js">
</script>
<style scoped lang="scss">
@import './Index.scss';
</style>

