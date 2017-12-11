import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        globalApi: "http://testapi.niubaifa.com",// 测试阶段除会员外的全局api,
        //token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ0aW1lIjoxNTExOTI2MDE1LCJjbGllbnRfaWQiOiJmOWVod2cifQ.vDqw-pj11bG1wZlZzwD2K_sRnHM7LS_3FeePGsmJKyw',
        token: '',
        adminToken:'',
        userInfo: {},//全局用户信息
        websiteInfo: {},
        messageInfo: {}//再次营销的信息对象
    },
    mutations: {
        backToTop (state) {//回到顶部
            let speed = document.documentElement.scrollTop / 6;
            let timer = setInterval(function(){
                speed = document.documentElement.scrollTop / 6;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                if(speed <= 0){
                    clearInterval(timer);
                }else{
                    document.documentElement.scrollTop -= speed;
                }
            },30);  
        },
        setToken(state, token) {//设置用户token
            state.token = token;
        },
        setAdminToken(state, token) {//设置管理员token
            state.adminToken = token;
        },
        setUserInfo(state, info) {//设置用户信息
            state.userInfo = info;
        },
        setMessageInfo(state, info) {//设置短信信息
            state.messageInfo = info;
        },
        setWebsiteInfo(state, info) {//设置用户信息
            state.websiteInfo = info;
        }
    }
})