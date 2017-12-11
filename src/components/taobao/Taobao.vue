<template>
    <div class="app-detail">
        <div>
            <div class="ui-swiper-demo">
                <div v-swipe class="ui-swiper-container">
                    <div class="ui-swiper">
                    <div class="ui-swiper-box" v-for="(item,index) in swiperList" :key="index">
                        <img class="ui-swiper-filter" :src="item" :data-src="item" alt="">
                    </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!--  -->
        <div class="main_layout" data-reactid=".0.0:2">

            <div class="title_share">
                <h1>
                    <span>{{info.item.title}}</span>
                </h1>
            </div>
            <div class="d-price">
                <div>
                    <div class="present-price"><label class="price-name"></label>
                        <p class="o-t-price">
                            <span class="major">{{price.new}}</span>
                        </p>
                        <p class="txt">
                            <span>{{info.item.subtitle}}</span>
                        </p>
                    </div>
                    <div class="original-price" style="margin-bottom: 15px;">
                        <div class="">
                            <span>价格</span>
                            <span>:￥</span>
                            <del>{{price.old}}</del>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 评价 -->
                <div v-if="info.rate.total_count">
                    <div class="rate_header">
                        <h3 class="title" >宝贝评价({{rate.total_count || 0}})</h3>
                    </div>
                    <div class="rate_single">
                        <ul class="">
                            <li v-for="(item,index) in rate.rate_list" :key="index">
                                <div class="user-info">
                                    <span class="img">
                                        <img :src="item.head_pic" >
                                    </span>
                                    <span class="name">{{item.user_ame}}</span>
                                    <span :class="'level c-iconcom c-icon-c1 c-icon-lw'+item.member_level"></span>
                                </div>
                                <div class="rate-list">
                                    <p>{{item.content}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            <!-- 评价 -->
            <div style="border-top: .32rem solid #eee;" class="shop_header">
                <div class="img">
                    <img :src="info.seller.shop_icon">
                </div>
                <div class="info">
                    <div>
                        <h3>{{info.seller.shop_name}}</h3>
                    </div>
                </div>

            </div>

            <div class="button_container">
                <div class="sys_button gotoShopCategory ">
                    <p>所有宝贝</p>
                </div>
                <div class="sys_button gotoShop">
                    <p>进店逛逛</p>
                </div>
            </div>


            <!-- 展示 -->
            <div class="d-InfoMain">
                <div class="d-tabbar">
                    <ul>
                        <li v-for="(item,index) in tab" :class="item.index == showIndex ? 'sel' : 'ddd'" :key="index" @click="changeShow(item.index)">{{item.text}}</li>
                    </ul>
                </div>
                <div class="d-tabBox">
                    <!-- 详情 -->
                    <div id="descimg" class="itemPhotoDetail ">
                        <div class="detail-desc" v-if="showIndex == 0">
                            <div class="desc_page_box normal" v-for="(item,index) in detailList" :key="index">
                                <img :src="item" alt="">
                            </div>
                        </div>
                    </div>
                    
                    <!-- 参数 -->
                    <div id="item_props" class="itemIntroduce" v-if="showIndex == 1"> 
                        <dl v-for="(item,index) in propsList" :key="index">
                            <dt>{{item.name}}</dt> <dd>{{item.value}}</dd> 
                        </dl>
                    </div>

                    <!-- 评价 -->
                    <div v-if="showIndex == 2" class="shopRecommends" id="rate_list">
                        <div v-if="info.rate.total_count">
                            <div class="rate_header">
                                <h3 class="title" >宝贝评价({{rate.total_count || 0}})</h3>
                            </div>
                            <div class="rate_single">
                                <ul class="">
                                    <li v-for="(item,index) in rate.rate_list" :key="index">
                                        <div class="user-info">
                                            <span class="img">
                                                <img :src="item.head_pic" >
                                            </span>
                                            <span class="name">{{item.user_ame}}</span>
                                            <span :class="'level c-iconcom c-icon-c1 c-icon-lw'+item.member_level"></span>
                                        </div>
                                        <div style="margin-top:8px;">
                                            <p>{{item.content}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script src="./Taobao.js">
    
</script>
<style lang="scss" scoped>
@import './Taobao.scss';
</style>
<style lang="scss" scoped>
@import './Copy.scss';
</style>