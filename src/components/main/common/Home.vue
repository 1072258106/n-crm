<template>
    <div class="wrapper" :style="'padding-left:'+padding+'px;'">
        <v-header></v-header>
        <v-nav :padding="padding" @change="paddingChange"></v-nav>
        <el-row class="main">
            <!-- <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
            </transition> -->
            <router-view></router-view>
        </el-row>
    </div>
</template>
<script>
    import Header from './header/Header.vue';
    import Nav from './nav/Nav.vue';
    export default{
        components: {
            'v-header': Header,
            'v-nav': Nav
        },
        data() {
            return{
                padding: 160
            }
        },
        methods: {
            paddingChange(val) {
                this.padding = val;
            }
        }
    }
</script>
<style lang="scss" scoped>
.wrapper{
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 64px;
    transition: all .5s;
}
.main{
    height: 100%;
    background:#f1f1f1;
    padding: 24px;
    box-sizing: border-box;
    overflow:auto;
}
</style>
<style lang="scss">
@import './Common.scss';
</style>


