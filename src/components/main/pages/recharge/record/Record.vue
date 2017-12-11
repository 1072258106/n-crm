<template>
    <div>
        <div class="table-container" style="padding:16px;">
            <el-table :data="recordData" border v-loading="recordLoading" style="margin: 16px auto 0;">
                <el-table-column prop="source_name" label="来源">
                </el-table-column>
                <el-table-column prop="amount" label="金额">
                </el-table-column>
                <el-table-column prop="units" label="条数">
                </el-table-column>
                <el-table-column prop="before_sms" label="充值前余额">
                </el-table-column>
                <el-table-column prop="bill_time" label="订购时间">
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
                <el-table-column prop="status_name" label="订购状态">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.status_name == '待支付'" @click="pay(scope.row)">{{scope.row.status_name}}</el-button>
                        <span v-else>{{scope.row.status_name}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <el-pagination v-if="total>10" style="text-align:center;margin-top:16px;"
            @current-change="getRecord"
            :current-page.sync="page"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script src="./Record.js">
</script>
<style lang="scss" scoped>
@import './Record.scss';
</style>

