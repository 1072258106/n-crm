<template>
  <div class="help">
      <v-banner pic="banner-help.jpg" title="帮助中心" text="Help center"></v-banner>
      <el-row class="help-container" style="min-height:100px;" v-loading="listLoading">
          <h3 class="title">{{title}}</h3>
          <ul>
              <li v-for="(item,index) in list" :key="index">
                  <p class="question">
                      <i class="icon iconfont icon-bangzhudisc"></i> <span>{{item.title}}</span>
                  </p>
                  <p class="answer">
                      <i class="icon iconfont icon-huida"></i> 
                      <span>{{item.description}}</span>
                  </p>
              </li>
          </ul>
      </el-row>
  </div>
</template>

<script src="./Index.js">
</script>

<style lang="scss" scoped>
@import './Index.scss';
</style>

