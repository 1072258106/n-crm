<template>
  <div class="index">
      <div class="banner">
          <h2 class="banner-title text-shadow">牛百发短信营销平台</h2>
          <p class="banner-p text-shadow">
              106三网合一通道，秒发万条，简单、安全、稳定、高效
              <br/>您的短信营销专家
            <!-- 多渠道整合营销平台，让您的营销更容易、更精准、更有效
            <br/>
            您的营销自动化专家 -->
          </p>
          <router-link class="btn" to="/login/register">免费注册</router-link>
      </div>
      <!-- 服务介绍 -->
      <el-row class="item-container" style="padding-top:32px;">
          <h2 class="item-title">服务介绍</h2>
          <p class="item-info">
              牛百发致力于营销自动化的创新，专注为企业打造多渠道营销体系<br/>
              现已服务于淘宝、京东、微信、1688、口碑网、百度等知名企业。
          </p>
          <el-row class="item-content" type="flex" justify="space-around">
              <el-col :span="7">
                  <span class="icon-box">
                      <i class="icon iconfont icon-yingxiao"></i>
                  </span>
                  <p class="serve-name">营销短信</p>
                  <p class="serve-info">
                      电信、联通、移动三网合一，“秒”到用户手机；<br/>
                      直连短信网关，安全稳定，即开即用；<br/>
                      面向电商、微商、淘宝客、商超、金融投资等领域。
                  </p>
                  <div class="btn-box">
                      <router-link to="/serve/sale" class="btn">了解详情</router-link>
                  </div>
              </el-col>
              <el-col :span="7">
                  <span class="icon-box">
                      <i class="icon iconfont icon-tongzhi"></i>
                  </span>
                  <p class="serve-name">通知短信</p>
                  <p class="serve-info">
                      自研邮件发送引擎，高达98%的邮件送达率；<br/>
                      数据报表详尽，任意跟踪每一次点击；精准定位用户地域、<br/>
                      活跃度、客户端，精准投递。
                  </p>
                  <div class="btn-box">
                      <router-link to="/serve/notice" class="btn">了解详情</router-link>
                  </div>
              </el-col>
              <el-col :span="7">
                  <span class="icon-box">
                      <i class="icon iconfont icon-yanzhengyanzhengma"></i>
                  </span>
                  <p class="serve-name">验证码短信</p>
                  <p class="serve-info">
                      在互动有趣的微信营销场景中添加自定义广告；<br/>
                      用户在玩的同时看到广告；<br/>
                      互动有趣的玩法能刺激用户主动分享朋友圈传播。
                  </p>
                  <div class="btn-box">
                      <router-link to="/serve/verify" class="btn">了解详情</router-link>
                  </div>
              </el-col>
          </el-row>
      </el-row>

      <!-- 热门短信 -->
      <el-row class="messages">
          <h2 class="title">热门短信</h2>
          <el-row class="messages-container" type="flex" justify="space-around">
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">淘客短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">微商短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">金融短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">验证码短信</p>
              </el-col>
          </el-row>
          <el-row class="messages-container" type="flex" justify="space-around" style="margin-top:24px;">
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">淘客短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">微商短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">金融短信</p>
              </el-col>
              <el-col :span="4">
                  <div class="message-content">
                      【淘折扣】您的购物信用良好，特邀您进内部优惠群，请加微信：XXXXXX，仅限今日，群满关门。每天还有红包雨，秒杀！ 回复T退订
                  </div>
                  <p class="type">验证码短信</p>
              </el-col>
          </el-row>
      </el-row>
      <!-- 行业应用 -->
      <el-row class="item-container" style="padding-top:32px;">
          <h2 class="item-title">行业应用</h2>
          <el-row class="apply">
              <el-col :span="6" class="apply-1">
                  <el-col :span="14">
                        <div class="apply-title">电商</div>
                        <div class="apply-btn"><router-link to="/case/online">了解详情>></router-link></div>
                  </el-col>
                  <el-col :span="10">
                      <span class="icon-box">
                          <i class="icon iconfont icon-dianshang"></i>
                      </span>
                  </el-col>
              </el-col>
              <el-col :span="6" class="apply-2">
                  <el-col :span="14">
                        <div class="apply-title">淘宝客</div>
                        <div class="apply-btn"><router-link to="/case/taobao">了解详情>></router-link> </div>
                  </el-col>
                  <el-col :span="10">
                      <span class="icon-box">
                          <i class="icon iconfont icon-taobao"></i>
                      </span>
                  </el-col>
              </el-col>
              <el-col :span="6" class="apply-3">
                  <el-col :span="14">
                        <div class="apply-title">微商</div>
                        <div class="apply-btn"><router-link to="/case/wei">了解详情>></router-link></div>
                  </el-col>
                  <el-col :span="10">
                      <span class="icon-box">
                          <i class="icon iconfont icon-0023"></i>
                      </span>
                  </el-col>
              </el-col>
              <el-col :span="6" class="apply-4">
                  <el-col :span="14">
                        <div class="apply-title">商超</div>
                        <div class="apply-btn"><router-link to="/case/super">了解详情>></router-link></div>
                  </el-col>
                  <el-col :span="10">
                      <span class="icon-box">
                          <i class="icon iconfont icon-jinrongdaikuan"></i>
                      </span>
                  </el-col>
              </el-col>
          </el-row>
      </el-row>
      <!--  -->
      <el-row class="count">
          <el-col :span="6">
              <p class="number">10000+</p>
              <p class="text">上万家企业的选择</p>
          </el-col>
          <el-col :span="6">
              <p class="number">20+</p>
              <p class="text">服务行业20余种</p>
          </el-col>
          <el-col :span="6">
              <p class="number">30亿+</p>
              <p class="text">超过30亿次的年营销次数</p>
          </el-col>
          <el-col :span="6">
              <p class="number">98%+</p>
              <p class="text">高达98%的到达率</p>
          </el-col>
      </el-row>
      <!-- 选择我们的公司 -->
      <el-row class="company">
          <p class="company-title">他们选择了我们</p>
          <img src="../../../../../static/img/company.jpg" alt="">
      </el-row>

      <!-- 资讯营销 -->
      <el-row class="info">
          <h2 class="info-title">营销资讯</h2>
          <el-row type="flex" class="" justify="space-around">
              <el-col :span="7">
                  <div class="item-title">
                      <h3 class="name">行业动态</h3>
                      <div class="line"></div>
                  </div>
                  <ul class="info-list">
                      <li v-for="(item,index) in hangyeList" :key="index">
                          <i class="icon iconfont icon-mjiantou"></i>
                          <router-link :to="'/info/movement/article?id='+item.id">{{item.title}}</router-link>
                      </li>
                  </ul>
                  <router-link v-if="hangyeList.length > 10" class="more" to="/info/movement">查看更多</router-link>
              </el-col>
              <el-col :span="7">
                  <div class="item-title">
                      <h3 class="name">短信平台</h3>
                      <div class="line"></div>
                  </div>
                  <ul class="info-list">
                      <li v-for="(item,index) in messageList" :key="index">
                          <i class="icon iconfont icon-mjiantou"></i>
                          <router-link :to="'/info/movement/article?id='+item.id">{{item.title}}</router-link>
                      </li>
                  </ul>
                  <router-link v-if="messageList.length > 10" class="more" to="/info/platform">查看更多</router-link>
              </el-col>
              <el-col :span="7">
                  <div class="item-title">
                      <h3 class="name">国际短信</h3>
                      <div class="line"></div>
                  </div>
                  <ul class="info-list">
                      <li v-for="(item,index) in nationList" :key="index">
                          <i class="icon iconfont icon-mjiantou"></i>
                          <router-link :to="'/info/movement/article?id='+item.id">{{item.title}}</router-link>
                      </li>
                  </ul>
                  <router-link v-if="nationList.length > 10" class="more" to="/info/international">查看更多</router-link>
              </el-col>
          </el-row>
          <router-link class="get-more" to="/info/movement" target="_blank">
              获取更多资源&nbsp;&nbsp;<i class="icon iconfont icon-mjiantou"></i>
          </router-link>
      </el-row>

      <!-- 注册 -->
      <el-row class="register">
          <p class="text-1">想领先你的竞争对手吗？</p>
          <p class="text-2">
              90%的企业选择立即试用,抢先提升营销效果KPI<br/>
              现在申请可享
          </p>
          <p class="text-3"><i class="icon iconfont icon-jiantou1"></i></p>
          <div class="btn-box">
              <router-link to="/login/register">免费注册&nbsp;<i class="icon iconfont icon-jinru"></i></router-link>
          </div>
      </el-row>
  </div>
</template>

<script src="./Index.js">
</script>

<style lang="scss" scoped>
    @import './Index.scss';
</style>

