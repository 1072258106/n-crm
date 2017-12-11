<template>
    <div class="problem">
        <div class="item-container">
            <div class="container-title">
                短信内容限制
            </div>
            <div class="content">
                <div class="content-title">总原则</div>
                <div class="content-content red">
                    <span class="sidebar"></span>
                    <p>严禁发送以下内容，我们将保留追究发送人法律责任的权利！</p>
                    <p>1、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                    <p>2、损坏国家荣誉和利益的；</p>
                    <p>3、煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                    <p>4、破坏国家民族宗教政策，宣扬邪教和封建迷信的；</p>
                    <p>5、散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                    <p>6、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                    <p>7、侮辱或者诽谤他人，侵害他人合法权益的；</p>
                    <p>8、尝试欺骗、骚扰让人的；</p>
                    <p>9、我国现行法律、行政法规、政策禁止的内容；</p>
                </div>
            </div>
            <div class="content">
                <div class="content-title">验证码短信限制</div>
                <div class="content-content ban">
                    <span class="sidebar"></span>
                    <p>短信验证码 ：使用同一个签名，对同一个手机号码发送短信验证码，1条/分钟，5条/小时，10条/天。验证码短信可以24小时发送，没有时间限制，短信免审核。</p>
                </div>
                <div class="content-content example">
                    <span class="sidebar"></span>
                    <p>短信验证码 ：使用同一个签名，对同一个手机号码发送短信验证码，1条/分钟，5条/小时，10条/天。验证码短信可以24小时发送，没有时间限制，短信免审核。</p>
                </div>
            </div>

            <div class="content">
                <div class="content-title">通知短信限制</div>
                <div class="content-content ban">
                    <span class="sidebar"></span>
                    <p>短信通知： 使用同一个签名和同一个短信模板ID，对同一个手机号码发送短信通知，支持50条/日。通知短信可以24小时发送，没有时间限制，短信免审核。</p>
                </div>
                <div class="content-content example">
                    <span class="sidebar"></span>
                    <p>示例：【签名】亲爱的会员您好，您在本店购买的商品已发货，物流公司：顺丰快递，物流单号：12345678。</p>
                </div>
            </div>

            <div class="content">
                <div class="content-title">营销短信限制</div>
                <div class="content-content ban">
                    <span class="sidebar"></span>
                    <p>短信营销：发信频率和时间段不能干扰用户正常使用，一般同一号码10分钟内不超过3条，1个月内不超过10条，营销短信内容尾部要带上“回复T退订”字样。为了不打扰客户正常休息，营销短信一般发送时间为 8:00—22:00 ，双11大促等特殊情况除外</p>
                </div>
                <div class="content-content example">
                    <span class="sidebar"></span>
                    <p>示例：【签名】**店铺双十一年度巅峰钜蕙，狂欢价震撼揭晓！抢先领券+购物车享全.年最低价，点击进入*链接*</p>
                </div>
            </div>
        </div>
        
    <!-- 短信计费规则 -->
        <div class="item-container">
            <div class="container-title">
                收不到短信怎么办
            </div>
            <div class="content">
                <div class="content-title">短信内容计算规则？</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>短信字数＝短信模板内容字数 + 签名字数 + 回复T退订字数；</p>
                    <p>短信字数<=70个字数，按照70个字数一条短信计算</p>
                    <p>短信字数>70个字数，即为长短信，按照67个字数记为一条短信计算</p>
                </div>
            </div>
            
            <div class="content">
                <div class="content-title">短信的计费模式？</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>短信采取预充值预扣费模式</p>
                    <p>预充值：您需要提前充值短信才能够执行发送任务</p>
                    <p>预扣费：短信发送任务提交后，将先扣费，实际返回状态后根据失败条数进行短信量返补。（状态返还72小时内完成）</p>
                </div>
            </div>

            <div class="content">
                <div class="content-title">平台会不会扣量？</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>牛百发平台秉承着诚信为本的原则，每条短信状态可溯源查询，坚决不扣量，扣1罚3倍！</p>
                </div>
            </div>
        </div>

    <!-- 收不到短信怎么办 -->
        <div class="item-container">
            <div class="container-title">
                收不到短信怎么办
            </div>
            <div class="content">
                <div class="content-title">收不到短信的原因分析</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>
1、您提交发送的短信内容还在审核中，短信运营商要求所有营销短信内容必须人工审核，平台每隔5-10分钟审核一次；</p>
                    <p>2、您提交的短信有违规内容，审核不通过；</p>
                    <p>3、您提交的发送时间不在这个范围内；</p>
                    <p>4、您的短信被手机拦截了；</p>
                    <p>5、短信是由移动全国各地区的基站发送的，基站信息不好有可能导致个别号码发送失败；</p>
                    <p>6、您的手机号码曾经回复过“N”或“T”等内容退订，被短信通道列为了黑名单，不再发送；</p>
                    <p>7、您发送的同一个号码超限制次数，系统采用了防骚扰机制，自动屏蔽了短信。</p>
                </div>
            </div>
            
            <div class="content">
                <div class="content-title">有什么快捷办法解决吗？</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>您可以把没收到短信的号码提交给我们的客服，让客服帮您查短信回执状态来找原因，帮您找解决方案。</p>
                </div>
            </div>

            <div class="content">
                <div class="content-title">如何防短信拦截？</div>
                <div class="content-content gray">
                    <span class="sidebar"></span>
                    <p>关于短信拦截： 苹果手机不会拦截任何短信，部分安卓手机系统自带有拦截功能，或者安装了360手机助手、QQ手机管家等软件具有拦截功能。拦截软件都有保密的敏感词库，通过优化短信文案可以降低拦截率，例如“优惠券”可优化为“优蕙券”。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import './Problem.scss';
</style>

