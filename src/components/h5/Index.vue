<template>
  <div :class="isPC ? 'show-middle show-pc' : 'show-middle'" id="works">
        <div :class="isFireFox ? 'firefox show-container' : 'show-container'">
            <div class="box">
                <div right="myright" class="elements" v-for="(item,index) in elements" :key="index" :style="'left:'+item.css.left+'px;top:'+item.css.top+'px;font-size:'+item.css.fontSize+'px;padding:'+item.css.padding+'px;color:'+item.css.color+';background:'+item.css.background+';z-index:'+item.css.zIndex+';border-width:'+item.css.borderWidth+'px;border-style:solid;border-color:'+item.css.borderColor+';transform:'+item.css.transform+';'"  v-if="item.videoShow">
                    <a target="_blank" v-if="item.type == 'text'" :style="'color:'+item.css.color+';'" :href="item.href || 'javascript:;'">
                        <span>{{item.text || '请输入文字'}}</span>
                    </a>
                    <a target="_blank" v-if="item.type == 'img'" :href="item.href || 'javascript:;'">
                        <img class="single-img" :src="item.src+'?s='+widowWidth" alt="">
                    </a>
                    <div style="height:200px;" v-if="item.type == 'video'" v-html="item.videoSrc">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isPC" class="canvas-container">
            <p>用手机查看</p>
            <canvas id="canvas" height="170" width="170"></canvas>
        </div>
</div>
</template>
<script src="./Index.js">
</script>
<style lang="scss" scoped>
@import './Index.scss';
</style>
