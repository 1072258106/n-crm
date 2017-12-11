<template>
  <header class="header">
      <div class="topbar">
          <!-- <span class="top-item"><i class="icon iconfont icon-3-copy"></i>18758896155</span> -->
          <!-- <a class="top-item" href="javascript:;"><i class="icon iconfont icon-ren"></i>平台登录</a> -->
          <router-link class="top-item" to="/login"><i class="icon iconfont icon-ren"></i>平台登录</router-link>
      </div>
      <div class="logo-bar">
          <div class="logo">
               <img @click="$router.push('/')" src="../../../../../static/img/logo.png" alt="">
               <span>160三网合一短信营销，百发百中就是牛</span>
          </div>
          <router-link to="/login/register">
              <el-button size="mini" type="primary" class="btn">免费注册</el-button>
          </router-link>
          <div class="nav">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item index="/index">首页</el-menu-item>
                        <el-submenu index="/serve">
                            <template slot="title">产品服务</template>
                            <el-menu-item index="/serve/sale">营销短信</el-menu-item>
                            <el-menu-item index="/serve/notice">通知短信</el-menu-item>
                            <el-menu-item index="/serve/verify">验证码短信</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/case">
                            <template slot="title">行业案例</template>
                            <el-menu-item index="/case/online">电商</el-menu-item>
                            <el-menu-item index="/case/taobao">淘宝</el-menu-item>
                            <el-menu-item index="/case/wei">微商</el-menu-item>
                            <el-menu-item index="/case/super">商超</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/info">
                            <template slot="title">营销资讯</template>
                            <el-menu-item index="/info/movement">行业动态</el-menu-item>
                            <el-menu-item index="/info/platform">短信平台</el-menu-item>
                            <el-menu-item index="/info/international">国际短信</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/help">
                            <template slot="title">帮助中心</template>
                            <el-menu-item index="/help/normal">常见问题</el-menu-item>
                            <el-menu-item index="/help/freshman">新手入门</el-menu-item>
                        </el-submenu>
              </el-menu>
          </div>
      </div>
  </header>
</template>
<script src="./Header.js"></script>

<style lang="scss" scoped>
    @import './Header.scss';
</style>



