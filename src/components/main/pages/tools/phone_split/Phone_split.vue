<template>
    <div>
        <div class="tz-alert primary margin-bottom-16">
            <i class="el-icon-information"></i> &nbsp;帮助用户筛选选定号码归属地和运营商的号码
        </div>
    <div class="box">
            <div class="stepContent">
                <div class="margin-bottom-16">
                    <el-upload :action="uploadUrl" 
                        :show-file-list="false" 
                        :on-success="handleSuccess" 
                        :on-error="handleFail" 
                        :on-progress="handlePro" 
                        :before-upload="beforeUpload" 
                        :headers="header" 
                        style="display:inline-block;">
                        <el-button type="primary">导入号码</el-button>
                    </el-upload>
                    <span class="help-text" style="margin-left:8px;">
                        支持文件类型 EXCEL、CSV、TXT，一行一个号码，文件大小50M以内
                    </span>
                </div>
                <el-table :data="files" style="width:100%">
                    <el-table-column label="名称" prop="name" min-width="200px"></el-table-column>
                    <el-table-column label="上传进度" header-align="center">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.percentage" :status="scope.row.percentage==100?'success':''"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="号码数量">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isProcessing"><i class="el-icon-loading"></i>&nbsp;处理中...</span><span v-if="!scope.row.isProcessing">{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.$index==0" @click="deleteFile" size="mini" type="text">全部删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>        
            <div class="stepContent">
                <div>
                    <label class="sub-title">运营商：</label>
                    <div class="sub-body">
                        <el-checkbox :indeterminate="mobileType.isIndeterminate" v-model="mobileType.checkAll" @change="handleMobileTypeCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="search.mobile_type" @change="handleMobileTypeChange">
                            <el-checkbox v-for="option in mobileType.options" :label="option" :key="option">{{option}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div>
                    <label class="sub-title">所在地：</label>
                    <div class="sub-body">
                        <el-checkbox :indeterminate="area.isIndeterminate" v-model="area.checkAll" @change="handleAreaCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="search.area_id" @change="handleAreaChange">
                            <el-checkbox v-for="option in area.options" :label="option.area_id" :key="option.area_id">{{option.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>          
            <div class="stepContent">
                <div class="margin-bottom-20">
                    <label class="sub-title" style="padding: 8px 0 8px 0;width:auto;">筛选结果：</label>
                    <div class="sub-body" style="line-height: 30px;margin-left:70px;">
                        <span class="text-danger text-bold" style="color:red;">{{total}} </span>个
                    </div>
                </div>  
                <el-button type="primary" :loading="filtering" @click="filters">开始筛选</el-button>
                <el-button type="success" :disabled="total == 0" @click="download">导出号码</el-button>
            </div>
    </div>
    </div>
</template>

<script src="./Phone_split.js">
</script>

<style lang="scss" scoped>
@import './Phone_split.scss';
</style>
<style>
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #5a5e66;
}
</style>

