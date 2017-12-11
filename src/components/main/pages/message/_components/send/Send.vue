<template>
    <div>
        <div class="tz-alert primary margin-bottom-20">
            <h4>
                <i class="el-icon-information"></i>&nbsp;短信群发公告：</h4>
            <p>1.为了避免打扰客户休息，短信发送时间为8:00-22:00，超过时间顺延到次日发送（大促期间，相应发送时段以公告为准）</p>
            <p>2.为防止发违规信息而引起客户投诉，所有营销类短息都需要人工审核，请提交正规的短信文案测试或发送，否则有可能审核通不过。</p>
            <p>3.根据淘宝规定，本平台只接受正规的电商会员营销短信，欲发送加微信、加QQ群等其它非电商等内容请联系客服QQ：158208689</p>

        </div>
        <div class="table-container" ref="container">
            <table class="table-default table">
                <tr>
                    <td>
                        <label class="sub-title">活动名称：</label>
                        <div class="sub-body">
                            <el-col :span="7">
                                <el-input v-model="title" placeholder="请输入活动名称" />
                            </el-col>
                            <span class="help-block">&nbsp;20个字以内</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>
                            <label class="sub-title">选择客户：</label>
                            <div class="sub-body">
                                <el-upload :show-file-list="false" style="display:inline-block;" :action="globalApi+'/active/upload'" :headers="header" :data="uploadData" :on-success="handleSuccess" :on-error="handleFail" :on-progress="handlePro" :before-upload="beforeUpload">
                                    <el-button type="primary" size="small">导入手机号码</el-button>
                                </el-upload>
                                <v-input v-if="sendType == 1"  @input-success="handleInputSuccess"></v-input>
                                
                                <p class="help-block">
                                    <span v-if="sendType == 1">支持文件类型EXCEL、CSV、TXT</span>
                                    <span v-else>支持文件类型EXCEL、CSV</span>
                                    <a :href="sendType == 1 ? '/static/upload.csv' : '/static/变量短信模板.xlsx'" target="_blank" class="btn-text">下载Excel模板</a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <label class="sub-title">已选客户：</label>
                            <div class="sub-body">
                                <ul class="file-list">
                                    <li class="header files">
                                        <div class="item">名称</div>
                                        <div class="item">进度</div>
                                        <div class="item">人数</div>
                                        <div class="item">操作</div>
                                    </li>
                                    <li v-for="(item,index) in userFiles" :key="index">
                                        <div class="name item">{{item.name}}</div>
                                        <div class="process item">
                                            <el-progress style="margin-top:13px;" :percentage="item.percentage" :status="item.percentage==100?'success':''"></el-progress>
                                        </div>
                                        <el-row class="name item">
                                            <span v-if="item.isProcessing"><i class="el-icon-loading"></i>&nbsp;处理中...</span>
                                            <span v-else>{{item.number}}</span>
                                        </el-row>
                                        <div class="item">
                                            <el-button v-if="index==0" @click="deleteAll" size="mini" type="text">全部删除</el-button>
                                        </div>
                                    </li>
                                </ul>
                                <!-- <el-table :data="userFiles" style="width:100%;" :header-row-style="{background: '#eef1f6'}" border>
                                    <el-table-column prop="name" width="300px" label="名称"></el-table-column>
                                    <el-table-column label="进度" header-align="center">
                                        <template slot-scope="scope">
                                            <el-progress :percentage="scope.row.percentage" :status="scope.row.percentage==100?'success':''"></el-progress>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="number" align="center" label="人数"></el-table-column>
                                    <el-table-column label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button v-if="scope.$index==0" @click="deleteAll" size="mini" type="text">全部删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table> -->
                                <div v-if="total > 0" class="tz-alert success tiny" style="margin-top:5px">
                                    <i class="el-icon-information"></i>
                                    号码去重后共选择
                                    <span class="text-danger">{{total}}</span>个号码
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- 编辑内容 -->
                <tr>
                    <td>
                        <div>
                            <div class="message">
                                <div class="message-set">
                                    <el-row>
                                        <el-col :span="16">
                                            <div class="writer">
                                                <div class="margin-bottom-10">
                                                    <label class="sub-title">短信文案：</label>
                                                    <div class="sub-body">
                                                        <div class="smsContainer">
                                                            <div class="fix" contenteditable="false">您已经输入
                                                                <span class="high-light">{{words}}</span>
                                                                个字,预计扣除
                                                                <span class="high-light">{{section}}</span>
                                                                条短信,以实际字数为准! &nbsp;&nbsp;
                                                                <el-tooltip content="每条短信按70个字处理(包括签名)，超过一条按每条短信67个字处理" placement="top">
                                                                    <a href="javascript:void(0)">计费规则</a>
                                                                </el-tooltip>

                                                            </div>
                                                            <el-input class="editable" type="textarea" :rows="5" placeholder="请输入内容" v-model="content" id="textarea">
                                                            </el-input>
                                                            <div :class="blackWords.length>0 ? 'unexit bottom32' : 'unexit bottom2'">回复T退订【短信签名】</div>
                                                            <div class="black_words_tip" v-if="blackWords.length>0">短信中含有违禁词：
                                                            <b v-for="(item,index) in blackWords" :key="index">{{item}}&nbsp;&nbsp;</b>
                                                            <span>(该条短信将无法发送，请去掉违禁词)</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <!-- 短信内容 -->
                                                <div class="margin-bottom-10">
                                                    <div class="insert">
                                                        <label class="sub-title">插入短链：</label>
                                                        <div class="sub-body">
                                                            <el-col :span="21" class="var-btn-panel">
                                                                <el-button size="small" type="primary" @click="insertShortVisible = true">插入短链</el-button>
                                                                <el-button v-if="sendType == 2" size="small" type="primary" @click="insertVariable('{变量}')">插入变量</el-button>
                                                                <!-- <url-button label="亲橙短链" :type="4" /> -->
                                                            </el-col>
                                                            <!-- <el-col :span="3">
                                                                <el-button size="mini" >短信模板</el-button>
                                                            </el-col> -->
                                                            <div>
                                                                <el-col :span="24" class="sign help-text">
                                                                    注意：插入短链前后请加空格，否则可能导致手机端无法打开网页！
                                                                </el-col>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <!-- 插入变量 -->
                                                <div class="margin-bottom-10">
                                                    <div class="insert">
                                                        <label class="sub-title">短信签名：</label>
                                                        <div class="sub-body">

                                                            <div class="el-input">
                                                                <el-col :span="6">
                                                                    <el-select v-model="signValue" placeholder="请选择" @change="handleSignSelected">
                                                                        <el-option v-for="item in signList" :key="item.id" :label="item.label" :value="item.id">
                                                                        </el-option>
                                                                    </el-select>
                                                                </el-col>
                                                                <span class="sign help-text">
                                                                    <el-button type="text" @click="applySignVisible = true">申请自定义签名</el-button>
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-10">
                                                    <div class="insert">
                                                        <label class="sub-title">辅助工具：</label>
                                                        <div class="sub-body var-btn-panel">
                                                            <router-link to="/main/tools/h5" type="button" class="button">制作H5手机网页</router-link>
                                                            <router-link to="/main/tools/phone_split" type="button" class="button">筛选手机号码</router-link>
                                                            <!-- <input type="button" class="button" @click="goToH5" value="制作H5手机网页">
                                                            <input type="button" class="button" @click="goToH5" value="删选手机号码"> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- 辅助工具 -->
                                                <!-- <div>
                                                    <label class="sub-title">发送测试：</label>
                                                    <div class="sub-body">
                                                        <el-col :lg="6" :md="10" :sm="10">
                                                            <el-input placeholder="请输入手机号">
                                                                <el-button slot="append">测试</el-button>
                                                            </el-input>
                                                        </el-col>
                                                    </div>
                                                </div> -->
                                                <!-- 短信签名 -->
                                            </div>
                                        </el-col>
                                        <!-- 短信测试 -->
                                        <el-col :span="8" class="preview">
                                            <el-row>
                                                <el-col :span="24">
                                                    <el-row class="phone-contaienr">
                                                        <div class="phone">
                                                            <div class="content">
                                                                <div class="message-item" v-for="(item,index) in messageList" :key="index">{{item}}</div>
                                                            </div>
                                                            <div class="tip">说明：亲橙CRM只接受发正规的电商内容短信,其它内容有可能审核通不过</div>
                                                        </div>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </div>

                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="fixed-row">
                <div class="content">
                    <label class="sub-title">执行任务：</label>
                    <div class="sub-body" style="paddding:4px 0;">
                        <el-col :span="12">
                            <el-radio v-model="sendMethod" class="radio send-time" :label="1" style="width:100px;">立即发送</el-radio>
                            <el-radio v-model="sendMethod" class="radio send-time" :label="2" style="width:100px;">定时发送</el-radio>
                            <el-date-picker v-if="sendMethod == 2" size="small" v-model="sendTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择发送时间" align="right" :picker-options="pickerOptions0" @change="timeSelected">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <el-button type="danger" @click="send" :disabled="sendDisable">确认发送</el-button>
                        </el-col>
                    </div>
                </div>
            </div>
        </div>
        <!-- 插入短链弹框 -->
        <el-dialog
            title="插入短链"
            :visible.sync="insertShortVisible"
            width="40%">
            <el-form>
                <el-form-item>
                    <el-input v-model="longLink"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertShortVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertShort">确 认</el-button>
            </span>
        </el-dialog>

         <!-- 申请自定义弹框 -->
        <el-dialog
            title="自定义签名"
            :visible.sync="applySignVisible"
            width="40%">
            <el-form>
                <el-form-item label="">
                    <el-input v-model="applySignValue"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="applySignVisible = false">取 消</el-button>
                <el-button type="primary" @click="applySign">确 认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./Send.js">
</script>
<style lang="scss" scoped>
    @import './Send.scss';
</style>

