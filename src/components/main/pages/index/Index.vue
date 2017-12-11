<template>
    <div class="index">
        <!-- 第一行 -->
        <el-row>
            <el-col :span="18">
                <!-- 数据中心 -->
                <el-row class="item-container data-center" v-loading="totalLoading">
                    <div class="container-title">
                            数据中心
                            <span>持续更新中，短信发送后72小时内状态更新完成</span>
                    </div>
                    <div class="content">
                        <el-row>
                            <el-col :span="8">
                                <el-col :span="7" :offset="2">
                                    <div class="icon-box">
                                        <i class="icon iconfont icon-today"></i>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="count-container">
                                    <p class="success-title">今日成功</p>
                                    <p class="success-count">{{total.today.success}}</p>
                                    <p class="fail-title">今日失败</p>
                                    <p class="fail-count">{{total.today.error}}</p>
                                </el-col>
                            </el-col>
                            <el-col :span="8">
                                <el-col :span="7" :offset="2">
                                    <div class="icon-box">
                                        <i class="icon iconfont icon-yestoday"></i>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="count-container" :offset="2">
                                    <p class="success-title">昨日成功</p>
                                    <p class="success-count">{{total.yesterday.success}}</p>
                                    <p class="fail-title">昨日失败</p>
                                    <p class="fail-count">{{total.yesterday.error}}</p>
                                </el-col>
                            </el-col>
                            <el-col :span="8">
                                <el-col :span="7" :offset="2">
                                    <div class="icon-box">
                                        <i class="icon iconfont icon-lishi"></i>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="count-container" :offset="2">
                                    <p class="success-title">累计成功</p>
                                    <p class="success-count">{{total.all.success}}</p>
                                    <p class="fail-title">累计失败</p>
                                    <p class="fail-count">{{total.all.error}}</p>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </el-row>

                <!-- 快捷入口 -->
                <el-row class="item-container quick-enter" style="margin-top:24px;">
                    <div class="container-title">快捷入口 </div>
                    <el-row class="content" type="flex" justify="space-around">
                        <el-col :span="3" v-for="(item ,index) in pathList" :key="index">
                            <router-link :to="item.path">
                                <span :style="'background:'+item.background+';'">
                                    <i :class="'icon iconfont '+item.icon"></i> 
                                </span>
                                <p>{{item.text}}</p>
                            </router-link>
                        </el-col>
                    </el-row>
                </el-row>
            </el-col>
            <!-- 用户信息 -->
            <el-col :span="6" style="padding-left:24px;">
                <el-col :span="24" class="item-container userinfo" v-loading="userLoading">
                    <div class="container-title">账户信息</div>
                    <div class="content">
                        <ul>
                            <li>
                                <div class="left">
                                    <em>昵称：</em><span>{{userInfo.nick}}</span>
                                </div>
                                <a href="javascript:;" class="right btn-text" @click="modifyInfo(1)">修改</a>
                            </li>
                            <li>
                                <div class="left">
                                    <em>手机：</em><span>{{userInfo.mobile}}</span>
                                </div>
                                <a href="javascript:;" class="right btn-text" style="margin:0;" @click="passVisible = true;">修改密码</a>
                            </li>
                            <li>
                                <div class="left">
                                    <em>QQ：</em><span>{{userInfo.qq}}</span>
                                </div>
                                <a href="javascript:;" class="right btn-text" @click="modifyInfo(2)">修改</a>
                            </li>
                            <li>
                                <div class="left">
                                    <em>余额：</em><span>{{userInfo.sms}}条</span>
                                </div>
                                <router-link class="right btn-text" to="/main/recharge">充值</router-link>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-col>
            
            
        </el-row>

        <!-- 第二行 -->
        <el-row style="margin-top:24px;">
            <!-- 热门短信 -->
            <el-col :span="18">
                <el-row class="item-container hot-message">
                    <div class="container-title">
                            热门短信
                            <router-link to="/main/hot" class="more btn-text">更多</router-link>
                    </div>
                    <el-row class="content" v-loading="hotLoading">
                        <el-row>
                            <el-col :span="8" v-for="(item,index) in hotList" :key="index">
                                <div class="box">
                                    <div class="message-content">
                                        {{item.content}}
                                    </div>
                                    <p>{{item.module_name}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :offset="1" :span="7" v-for="(item,index) in hotList" :key="index" v-if="index >= 3 && index < 6">
                                <div>
                                    {{item.content}}
                                </div>
                                <p>{{item.type}}</p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :offset="1" :span="7" v-for="(item,index) in hotList" :key="index" v-if="index >= 6 && index < 9">
                                <div class="message-content">
                                    {{item.content}}
                                </div>
                                <p>{{item.type}}</p>
                            </el-col>
                        </el-row> -->
                    </el-row>
                </el-row>
            </el-col>
            <!-- 公告 -->
            <el-col :span="6" style="padding-left:24px;">
                <el-col :span="24" class="item-container gonggao">
                    <div class="container-title">系统公告</div>
                    <el-row class="content" v-loading="gonggaoLoading">
                        <ul>
                            <li v-for="(item,index) in anList" :key="index">
                                <a href="javascript:;" class="btn-text left" @click="showGonggao(item.id)">{{item.title}}</a>
                                <span class="right">{{item.create_at}}</span>
                            </li>
                        </ul>
                    </el-row>
                </el-col>
            </el-col>
            <!-- 公告弹框 -->
            <el-dialog
                :title="noticeTitle"
                :visible.sync="dialogVisible"
                width="40%">
                <span>{{message}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
                </span>
            </el-dialog>
        </el-row>

        <!-- 修改用户信息弹框 -->
        <el-dialog
            :title="modifyType == 1 ? '修改昵称' : '修改QQ'"
            :visible.sync="infoVisible"
            width="30%">
            <el-form label-width="80px">
                <el-form-item v-if="modifyType == 1">
                    <el-input v-model="changeInfo.nick"></el-input>
                </el-form-item>
                <el-form-item v-if="modifyType == 2">
                    <el-input v-model="changeInfo.qq"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="infoVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateInfo">确 认</el-button>
            </span>
        </el-dialog>

        <!-- 修改密码弹框 -->
        <el-dialog
            title="修改密码"
            :visible.sync="passVisible"
            width="40%">
            <el-form label-width="100px">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="password.old_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="password.new_password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input type="password" v-model="checkPass"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="passVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPass">确 认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script src="./Index.js">
</script>

<style lang="scss" scoped>
@import './Index.scss';
</style>
