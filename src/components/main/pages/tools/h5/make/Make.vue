<template>
    <div @click="blur">
        
        <el-col :span="24">
            <div class="editor">
                <el-row>  
                    <!--编辑区的标题-->
                    <el-col :span="24">
                        <div class="editor-title">
                            <el-row style="background:#fff;">
                                <el-col :span="12" style="padding-left:8px;">
                                    名称：<el-input @change="htmlNameVety" :maxlength="15" v-model="htmlName" class="find" size="small"></el-input>&nbsp;&nbsp;&nbsp;1-15个字以内
                                </el-col>
                                <el-col :span="12" style="text-align:center;">
                                    <el-button type="success" class="btn" @click.stop="show" size="small">预览</el-button>                                    
                                    <el-button type="primary" class="btn" @click.stop="save" size="small">保存</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!--编辑区-->
                    <el-col :span="24">
                        <div class="editor-area">
                            <el-row>
                                <el-col :span="6">
                                    <div class="editor-left">
                                        <el-row>
                                            <el-col :span="24">
                                                <h4 style="text-align:center;padding:16px;">选择模块</h4>
                                            </el-col>
                                            <el-col :span="24">
                                                <div class="select">
                                                    <el-row>
                                                        <el-col :span="12" v-for="(item,index) in items" :key="index">
                                                            <div class="word">
                                                                <div class="icon-box" @click.stop="insertElements(index)">
                                                                    <img :src="item.icon" alt="">
                                                                    <p>{{item.text}}</p>
                                                                </div>
                                                            </div>


                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="editor-center">
                                        <div class="editor-show">
                                            <div class="show-top">

                                            </div>
                                            <!-- 编辑的展示框 -->
                                            <div class="show-middle king" id="works">
                                                <div right="myright" :class="index == nowIndex ? 'elements selected' : 'elements'" v-for="(item,index) in elements" :key="index" :style="'left:'+item.css.left+'px;top:'+item.css.top+'px;font-size:'+item.css.fontSize+'px;padding:'+item.css.padding+'px;color:'+item.css.color+';background:'+item.css.background+';z-index:'+item.css.zIndex+';border-width:'+item.css.borderWidth+'px;border-style:solid;border-color:'+borderColor+';text-align:'+item.css.textAlign+';transform:'+item.css.transform+';'" @click.stop="choose(index,$event)">
                                                    <a target="_blank" v-if="item.type == 'text'" :style="'color:'+item.css.color+';'">
                                                        <span class="text">{{item.text || '请输入文字'}}</span>
                                                    </a>
                                                    <a target="_blank" v-if="item.type == 'img'">
                                                        <img class="single-img" :src="item.src + '?w=377'" alt="">
                                                    </a>
                                                    

                                                    <div style="height:200px;" v-if="item.type == 'video' && item.videoShow" v-html="item.videoSrc">
                                                        
                                                    </div>

                                                    <!-- 上下移动的操作 -->
                                                    <div class="up_down_del">
                                                        <span v-if="nowIndex != 0" @click.stop="changeArr('up')"><i class="icon iconfont icon-jiantoushang"></i></span>
                                                        <span v-if="nowIndex != elements.length-1" @click.stop="changeArr('down')"><i class="icon iconfont icon-jiantouxia"></i></span>
                                                        <span @click.stop="changeArr('del')"><i class="icon iconfont icon-cha"></i></span>
                                                    </div>
                                                    <!-- 图片操作的点 -->
                                                    <!-- <span class="dot-left-top dot" @click=""></span> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="editor-right">
                                        <el-row>
                                            <el-col :span="24">
                                                <h4 style="text-align:center;">设置属性</h4>
                                            </el-col>
                                            <el-col :span="24"  v-if="valueShow" class="control-box">
                                                <el-row v-if="controlType == 'text'">
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">文本内容</el-col>
                                                        <el-col :span="18">
                                                            <el-input @focus="initTextContent" v-model="elements[nowIndex].text"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">字体大小</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.fontSize" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">跳转链接</el-col>
                                                        <el-col :span="18">
                                                            <el-input @blur="addHttp" v-model="elements[nowIndex].href"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">内边距</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.padding" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">边框大小</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.borderWidth" @change="change" :max="10"></el-slider>
                                                        </el-col>
                                                    </el-row> -->
                                                    <el-row justify="space-between">
                                                        <el-col :span="6">字体对齐</el-col>
                                                        <el-col :span="18">
                                                            <el-radio-group v-model="elements[nowIndex].css.textAlign">
                                                                <el-radio-button label="left">左对齐</el-radio-button>
                                                                <el-radio-button label="center">居中</el-radio-button>
                                                                <el-radio-button label="right">右对齐</el-radio-button>
                                                            </el-radio-group>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">字体颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-if="controlType == 'text'" v-model="elements[nowIndex].css.color"></el-color-picker>
                                                        </el-col>
                                                        <el-col :span="6" class="control-title">背景颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                        </el-col>
                                                    </el-row>
                                                </el-row>
                                                <!-- 横向位置<el-slider v-model="left" @change="change" :min="-100"></el-slider>
                                                纵向位置<el-slider v-model="top" @change="change" :min="-100"></el-slider> -->
                                                <!-- 图片状态下的操作框 -->
                                                <el-row v-if="controlType == 'img'">
                                                    <el-row>
                                                            <!-- <el-upload
                                                                action="http://testcrmapi.niubaifa.com/tools/image_upload"
                                                                :show-file-list="false"
                                                                :headers="header">
                                                                <i class="el-icon-plus"></i>
                                                            </el-upload> -->

                                                            <el-upload
                                                                class="avatar-uploader"
                                                                :action="globalApi + '/tools/image_upload'"
                                                                :show-file-list="false"
                                                                :on-success="handleAvatarSuccess"
                                                                :before-upload="beforeAvatarUpload"
                                                                :headers="header">
                                                                <img v-if="elements[nowIndex].src" :src="elements[nowIndex].src" class="avatar">
                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                            </el-upload>
                                                        <!-- <el-col v-for="(item,index) in imgList" :key="index">

                                                        </el-col> -->
                                                    </el-row>
                                                    <!-- <el-dialog v-model="bigImgVisible" size="tiny">
                                                        <img width="100%" :src="elements[nowIndex].src" alt="">
                                                    </el-dialog> -->
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">跳转链接</el-col>
                                                        <el-col :span="18">
                                                            <el-input @blur="addHttp" v-model="elements[nowIndex].href"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">内边距</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.padding" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">背景颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- <el-row>
                                                        <el-col :span="6" class="control-title">高度</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="height" @change="change" :max="677"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col :span="6" class="control-title">宽度</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="width" @change="change" :max="375"></el-slider>
                                                        </el-col>
                                                    </el-row> -->
                                                </el-row>

                                                <!-- 视频的操作框 -->
                                                <el-row v-if="controlType == 'video'" class="control-video">
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">视频地址</el-col>
                                                        <el-col :span="18">
                                                            <el-input placeholder="请插入优酷、腾讯的通用视频链接" @change="modify(nowIndex)" @blur="verify(nowIndex)" v-model="elements[nowIndex].videoSrc"></el-input>
                                                            <span class="tip">请插入优酷、腾讯的通用视频链接</span>
                                                        </el-col>
                                                    </el-row>
                                                </el-row>

                                                
                                                <!-- <el-button @click="fixTop">置于顶层</el-button> -->
                                                <!-- <el-button @click="animate">动画</el-button> -->
                                                <!-- <el-button @click="deleteThis">删除</el-button>             -->
                                            </el-col>
                                            
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!--编辑区尾部-->
                    <el-col :span="24">
                        <div class="foot"></div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <!-- 预览效果 -->
        <el-dialog title="预览效果" :visible.sync="showVisible">
            <show :content="showContent"></show>
        </el-dialog>
    </div>
</template>

<script src="./Make.js">
</script>

<style lang="scss" scoped>
@import './Make.scss';
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #7b7878;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
