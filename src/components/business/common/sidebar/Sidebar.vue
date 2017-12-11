<template>
    <div class="sidebar">
        <div class="item item-qq">
            <a :href="'tencent://Message/?Uin='+info.company_qq+'&websiteName='+info.company_url+'=&Menu=yes'">
                <i class="icon iconfont icon-qq"></i>
                <p>在线客服</p>
            </a>
        </div>
        <div class="item item-weixin" @mouseenter="enter('weixin')" @mouseleave="leave('weixin')">
            <i class="icon iconfont icon-0023"></i>
            <p>官方微信</p>
            <img class="hidecon weixin-hide" v-if="weixinShow" :src="globalApi + info.weixinewm" />
        </div>
        <div class="item item-phone" @mouseenter="enter('phone')" @mouseleave="leave('phone')">
            <i class="icon iconfont icon-3-copy"></i>
            <p>客服电话</p>
            <span class="phone-hide" v-if="phoneShow">{{info.company_tel}}</span>
        </div>
        <div class="item back_to_top" @click="backToTop">
            <i class="icon iconfont icon-huidaodingbu"></i>
        </div>
    </div>
</template>
<script src="./Sidebar.js">
</script>
<style lang="scss" scoped>
@import './Sidebar.scss';
</style>
