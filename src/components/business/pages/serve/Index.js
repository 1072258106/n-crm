import Banner from '../../common/banner/Banner.vue';
export default {
    components: {
        'v-banner':Banner
    },
    data() {
        return{
            type: this.$route.params.type,
            features: {
                "icon": "icon-yingxiao",
                "list":[
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                    '实施通道： 移动/联通/电信106通道',
                ]
            },
            info: [
                {
                    "icon": "icon-yingxiao",
                    "text": "电信、联通、移动三网合一，“秒”到用户手机"
                },
                {
                    "icon": "icon-yingxiao",
                    "text": "电信、联通、移动三网合一，“秒”到用户手机"
                },
                {
                    "icon": "icon-yingxiao",
                    "text": "电信、联通、移动三网合一，“秒”到用户手机"
                }
            ]
        }
    },
    computed: {
        title() {
            let result;
            if(this.type == 'sale'){
                result = '营销短信';
            }
            if(this.type == 'notice'){
                result = '通知短信';
            }
            if(this.type == 'verify'){
                result = '验证码短信';
            }
            return result;
        }
    },
    watch: {
        '$route'() {
            this.type = this.$route.params.type;
        }
    },
    mounted(){
    }
}