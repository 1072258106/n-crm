<template>
    <div>
        <v-header></v-header>
        <!-- <transition name="el-fade-in" mode="out-in">
            <router-view></router-view>
        </transition> -->
        <router-view></router-view>
        <v-footer></v-footer>
        <sidebar></sidebar>
    </div>
</template>
<script>
    import vHeader from './header/Header.vue';
    import vFooter from './footer/Footer.vue';
    import sidebar from './sidebar/Sidebar.vue';
    export default {
        components: {
            vHeader, vFooter, sidebar
        }
    }
</script>
