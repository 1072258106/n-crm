<template>
    <div style="padding:16px;">
        <el-table :data="msgData" border style="width: 95%; margin:16px auto 0;" v-loading="dataLoading">
            <el-table-column prop="name" label="短信套餐" width="180">
                <template slot-scope="scope">
                    <div>{{scope.row.name}}条</div>
                </template>
            </el-table-column>
            <el-table-column prop="big_decimal" label="原价" width="180">
                <template slot-scope="scope">
                    <div>1毛/每条</div>
                </template>
            </el-table-column>
            <el-table-column prop="unit_price" label="限时促销">
                <template slot-scope="scope">
                    <div>{{scope.row.unit_price / 100}}分/每条</div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="套餐价格">
                <template slot-scope="scope">
                    <div>{{scope.row.price}}元</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="85" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click="pay(scope.row.id)">充值</el-button> -->
                    <a class="btn-text" :href="globalApi+'/system/recharge/pay?id='+scope.row.id+'&token='+token" target="_blank">充值</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script src="./Recharge.js">
</script>

<style lang="scss" scoped>
@import './Recharge.scss';
</style>
