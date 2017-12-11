<template>
    <div>
        <!--发送记录统计-->
        <el-row>
            <div class="count">
                <el-col :span="6">
                    <div class="countEach">
                        <p>营销活动</p>
                        <span class="text-danger">{{Statistics.active_count || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach">
                        <p>发送人数</p>
                        <span class="text-green">{{Statistics.people_count || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach">
                        <p>失败号码</p>
                        <span class="text-orange">{{Statistics.error_count || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach" style="border:0;">
                        <p>短信条数</p>
                        <span class="text-primary">{{Statistics.sms_num || 0}}</span>
                    </div>
                </el-col>
            </div>
        </el-row>

        <!--发送记录搜索-->
        <el-row>
            <div class="search">
                <el-row type="flex" justify="space-between">
                    <el-col :span="7" class="search_item">
                        <label>
                            短信文案：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input size="small" v-model="search.content" placeholder="关键词" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>
                            发送日期：
                        </label>
                        <div>
                            <el-col :span="11">
                                <el-date-picker size="small" v-model="search.start_time" type="date" style="width:100%" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker size="small" v-model="search.end_time" type="date" style="width:100%" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item text-right">
                        <el-button size="small" type="primary" class="btns" @click="searchList">搜索</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-row>

        <!--状态数据显示-->
        <el-row :gutter="24" v-loading="recordLoading">
            <ul class="state">
                <!-- <li > -->
                <el-col :lg="6" :md="8" v-for="(item , index) in dataRecords" style="margin-bottom:16px;" :key="index">
                    <div class="state-one">
                        <el-row>
                            <el-col :span="24">
                                <div class="state-show">
                                    状态：
                                    <span style="color:#00b5ff;">{{item.status_name}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-msg">
                                    <p :title="item.content">{{item.content}}</p>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-info">
                                    <span style="margin-top:12px;" :title="item.name">活动名称：{{item.name}}</span><br>
                                    <!-- <span>创建时间：{{item.ac_created}}</span><br> -->
                                    <span :title="item.send_time">发送时间：{{item.send_time}}</span><br>
                                    <!-- <span>短信长度：70字占1条</span><br> -->
                                    <span>营销人数：{{item.count}}</span><br>
                                    <span>失败号码：{{item.error_count}}</span><br>
                                    <!-- <span>扣除短信：{{item.success_count*item.sms_count }}</span><br> -->
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-btn">
                                    <el-row>
                                        <el-col :span="12">
                                            <router-link tag="button" class="el-button btn el-button--primary" :to="'state/'+item.id">查看活动</router-link>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button type="primary" @click="sendAgain(item)">再次营销</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <!-- </li> -->
            </ul>
        </el-row>
        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getRecordData"
            :current-page.sync="search.page"
            :page-size="search.page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>


        <!--分页显示-->
        <!-- <el-row>
            <el-col :span="24" class="page-part">
                <div class=" top16 bottom16 text-center">
                    <el-pagination v-show="total>search.page_size" :current-page.sync="search.page" @current-change="handleCurrentChange" :page-size="search.page_size" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row> -->
    </div>
</template>

<script src="./Record.js">
</script>

<style lang="scss" scope>
@import './Record.scss';
</style>

