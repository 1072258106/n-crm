<template>
    <div>
        <!-- 活动信息 -->
        <el-row class="info-container item-container">
            <div class="container-title">
                {{detail.name}}
                <div class="info-time">
                    <span>创建时间：{{detail.created_at}}</span>
                    <span>发送时间：{{detail.send_time}}</span>
                </div>
            </div>
            <div class="message-content" :title="detail.content">
                {{detail.content}}
            </div>
            <el-row>
                <div class="pro-total">
                    <el-row>
                        <el-col :span="6">
                            <div class="pro-each">
                                <p>营销号码</p>
                                <span class="count-span-red">
                                    {{detail.count}}  <a v-show="detail.count>0" :href="globalApi+'/active/export?id='+id+'&token='+token" target="_blank"><i class="el-icon-download" style="color:#2db7f5;"></i></a>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="pro-each">
                                <!-- <p>字数/占用条数</p>
                                <span class="count-span-green">
                                     字数 /<span> 条数 </span>
                                </span> -->
                                <p>成功号码</p>
                                <span class="count-span-green">
                                     {{detail.success_count}}
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="pro-each">
                                <p>
                                    失败号码
                                    <el-popover placement="right" title="失败可能存在的原因是：" width="320" trigger="hover">
                                        <i class="icon iconfont icon-changjianwenti" slot="reference"></i> 1、手机号码错误或不存在</br> 2、手机用户欠费或已停机</br> 3、手机用户曾回复过“TD”给短信通道，已经列入通道黑名单</br> 4、短时间内同一个号码发送的短信过多</br> 5、手机用户短信收件箱已满</br> 6、手机中安装了360等短信拦截工具</br> 7、短信文案中使用的营销文案过多，被部分地区通信运营商拦截</br> 8、特殊时期，部分地区通信运营商临时增加了营销短信拦截机制</br><b>发送失败的人数统计约耗时24小时</b>
                                    </el-popover>
                                </p>
                                <span class="count-span-orange">
                                     {{detail.error_count}}  <a v-show="detail.error_count>0" :href="globalApi+'/active/export?id='+id+'&token='+token+'&status=2'" target="_blank"><i class="el-icon-download" style="color:#2db7f5;"></i></a>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="pro-each" style="border:0;">
                                <p>
                                    扣除短信
                                    <el-popover placement="right" title="扣除短信：" width="320" trigger="hover">
                                        <i class="icon iconfont icon-changjianwenti" slot="reference"></i> 扣除短信=（营销人数 测试人数-发送失败的人数）× 短信文案占用短信的条数
                                    </el-popover>
                                </p>
                                <span class="count-span-blue">
                                    {{detail.success_count}} 
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
        </el-row>

        <!-- 搜索框 -->
        <!-- <div class="seach-bg">
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">
                    <label>手机号码：</label>
                    <div>
                        <el-col :span="24">
                            <el-input placeholder="请输入手机号"></el-input>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>短信文案：</label>
                    <div>
                        <el-input placeholder="关键词 "></el-input>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>
                        发送日期：
                    </label>
                    <div>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%">
                            </el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%">
                            </el-date-picker>
                        </el-col>
                    </div>
                </el-col>
            </el-row>

            <el-row type="flex" justify="space-between" style="margin-top:16px">
                <el-col :span="7" class="search_item">
                    <label>
                        发送状态：
                    </label>
                    <div>
                        <el-select placeholder="选择">
                            <el-option></el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item text-right">
                    <a target="_blank" class="el-button--primary el-button">导出</a>
                    <el-button type="primary">搜索</el-button>
                </el-col>

            </el-row>
        </div> -->

        <!-- 状态列表 -->
        <div class="table-container" style="padding:16px;">
            <el-table :data="tableData" border style="width: 95%;margin:0 auto;">
                <el-table-column prop="task_id" label="批次" width="180" align="center">
                </el-table-column>
                <el-table-column prop="message" label="信息内容" min-width="200" class-name="over-visible">
                    <template slot-scope="scope">
                        <div class="msg-content " :title="scope.row.message ">
                            {{ scope.row.message}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="115" align="center">
                </el-table-column>
                <!-- <el-table-column prop="mobile_type" label="号码类别" width="85">
                </el-table-column> -->
                <!-- <el-table-column prop="province_name" label="归属地">
                </el-table-column> -->
                <el-table-column prop="created_at" label="发送时间" width="160" align="center">
                </el-table-column>
                <el-table-column prop="callback_at" label="回执时间" width="160" align="center">
                </el-table-column>
                <el-table-column prop="callback_tip" label="回执标识" width="110">
                </el-table-column>
                <el-table-column prop="send_status_name" label="发送状态" width="85" align="center">
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
                @current-change="getTableData"
                :current-page.sync="page"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script src="./State.js">
</script>
<style lang="scss" scoped>
@import 'State.scss';
</style>
