import Vue from 'vue';
import axios from 'axios'
import store from '../store/index.js';
import router from '../router/router.config.js';
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://testapi.niubaifa.com/';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if(config.url.indexOf('admin') >= 0){
            if (config.method == 'get') {//如果请求方式是get
                // config.headers['Access-Token'] = store.state.adminToken;
                return config;
            } else if (config.method == 'post'|| config.method == 'delete') {//如果请求方式是post
                config.headers['Content-Type'] = 'application/json';
                // config.headers['Access-Token'] = store.state.adminToken;
                return config;
            }
        }else{
            if (config.method == 'get') {//如果请求方式是get
                // config.headers['Access-Token'] = store.state.token;
                return config;
            } else if (config.method == 'post'|| config.method == 'delete') {//如果请求方式是post
                config.headers['Content-Type'] = 'application/json';
                // config.headers['Access-Token'] = store.state.token;
                return config;
            }
        }
        
       
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        switch (response.status) {
            case 200:
                
                if(response.data.code == 1000) {
                    router.push('/admin_login');
                }else{
                    return response;
                }
                break;
            
            default:
                // 处理异常;    
                break;
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.data.code) {
                case 1000:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)  // 返回接口返回的错误信息
    });

export default axios;