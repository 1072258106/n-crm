<template>
    <div class="recharge">
        <div class="item-container">
            <div class="router-bar">
                <el-button-group class="button-group">
                    <router-link to="/main/recharge" tag="el-button" active-class="el-button--primary" exact>短信充值</router-link>
                    <router-link to="/main/recharge/record" tag="el-button" active-class="el-button--primary" exact>充值记录</router-link>
                    <router-link to="/main/recharge/expend" tag="el-button" active-class="el-button--primary" exact>消耗记录</router-link>
                </el-button-group>
            </div>
            <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.recharge{
    .item-container{
        padding: 24px;
    }
    .router-bar{
        margin-bottom:16px;
        text-align: center;
        .button-group{

        }
    }
}
</style>

