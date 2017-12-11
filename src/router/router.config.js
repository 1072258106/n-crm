import Vue from 'vue';
import Router from 'vue-router';
import store from "../store/index";
import axios from '../http/http';

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['../components/business/common/Home.vue'], resolve),
            //进入首页获取站点信息
            beforeEnter: (to, from, next) => {
                axios.get("/site/site_config").then(
                    response => {
                        let res = response.data;
                        if(res.code == 0) {
                            console.log('dddd',res.data)
                            store.commit("setWebsiteInfo", res.data);
                            next();
                        }else{
                            this.$message.error('站点信息获取失败');
                        }
                    }
                )
            },
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/business/pages/index/Index.vue'], resolve),
                    name: ''
                },
                {
                    path: '/serve/:type',
                    component: resolve => require(['../components/business/pages/serve/Index.vue'], resolve),
                    name: '',
                },
                {//行业案例
                    path: '/case/:type',
                    component: resolve => require(['../components/business/pages/case/Index.vue'], resolve),
                    name: '',
                },
                {//营销资讯
                    path: '/info/:type',
                    component: resolve => require(['../components/business/pages/info/Index.vue'], resolve),
                    name: '',
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/business/pages/info/list/List.vue'], resolve),
                            name: ''
                        },
                        {
                            path: 'article',
                            component: resolve => require(['../components/business/pages/info/article/Article.vue'], resolve),
                            name: ''
                        }
                    ]
                },
                {//帮助中心
                    path: '/help/:type',
                    component: resolve => require(['../components/business/pages/help/Index.vue'], resolve),
                    name: '',
                },
                {//登录注册
                    path: '/login/',
                    component: resolve => require(['../components/business/pages/login/Index.vue'], resolve),
                    name: '',
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/business/pages/login/login/Login.vue'], resolve),
                            name: ''
                        },
                        {
                            path: 'register',
                            component: resolve => require(['../components/business/pages/login/register/Register.vue'], resolve),
                            name: ''
                        },
                        {
                            path: 'forget',
                            component: resolve => require(['../components/business/pages/login/forget/Forget.vue'], resolve),
                        }
                    ]
                },
                {//协议页
                    path: '/protocol',
                    component: resolve => require(['../components/business/pages/protocol/Protocol.vue'], resolve),
                    name: '',
                }
            ]
        },
        {
            path: '/main',
            meta: {name: "首页"},
            component: resolve => require(['../components/main/common/Home.vue'], resolve),
            //进入用户见面判断是否有token
            beforeEnter: (to, from, next) => {
                if (store.state.token.length === 0) {
                    const token = Vue.cookie.get('Access-Token');
                    if (token !== null) {
                        axios.defaults.headers['Access-Token'] = token;
                        store.commit("setToken", token);
                    } else {
                        router.push('/login');
                        return;
                    }
                }else{
                    axios.defaults.headers['Access-Token'] = store.state.token;
                }
                axios.get("/user/info/").then(
                    response => {
                        let res = response.data;
                        store.commit("setUserInfo", res.data);
                    }
                )
                next();
            },
            children: [
                {//首页
                    path: '',
                    component: resolve => require(['../components/main/pages/index/Index.vue'], resolve),
                    name: ''
                },
                {//短信群发
                    path: 'message',
                    component: resolve => require(['../components/main/pages/message/Index.vue'], resolve),
                    name: '',
                    meta: {name: "短信群发"},
                    children: [
                        {//普通短信
                            path: 'normal',
                            component: resolve => require(['../components/main/pages/message/normal/Normal.vue'], resolve),
                            name: '',
                            meta: {name:"普通短信"}
                        },
                        {//变量短信
                            path: 'variable',
                            component: resolve => require(['../components/main/pages/message/variable/Variable.vue'], resolve),
                            name: '',
                            meta: {name:"变量短信"}
                        },
                        {//发送记录
                            path: 'record',
                            component: resolve => require(['../components/main/pages/message/record/Record.vue'], resolve),
                            name: '',
                            meta: {name:"发送记录"}
                        },
                        {//查看活动
                            path: 'state/:id',
                            component: resolve => require(['../components/main/pages/message/state/State.vue'], resolve),
                            name: '',
                            meta: {name:"查看活动"}
                        }
                    ]
                },
                {//实用工具
                    path: 'tools',
                    meta: {name: "实用工具"},
                    component: {
                        template:`
                        <router-view></router-view>
                        `
                    },
                    children:[
                        {
                            path: 'h5',
                            component: resolve => require(['../components/main/pages/tools/h5/Index.vue'],resolve),
                            name:'',
                            meta: {name: "手机网页制作"},
                            children: [
                                {
                                    path: '',
                                    component: resolve => require(['../components/main/pages/tools/h5/make/Make.vue'],resolve),
                                    name:'',
                                    meta: {name: "h5制作"},
                                },
                                {
                                    path: 'list',
                                    component: resolve => require(['../components/main/pages/tools/h5/list/List.vue'],resolve),
                                    name:'',
                                    meta: {name: "我的h5"},
                                },
                            ]
                        },
                        {
                            path: 'phone_split',
                            component: resolve => require(['../components/main/pages/tools/phone_split/Phone_split.vue'] ,resolve),
                            name: '',
                            meta: {name: "号码筛选"},
                        },
                        {
                            path: 'change',
                            component: resolve => require(['../components/main/pages/tools/change/Change.vue'] ,resolve),
                            name: '',
                            meta: {name: "链接转换"},
                        }
                    ]
                },
                {//热门短信
                    path: 'hot',
                    component: resolve => require(['../components/main/pages/hot/Hot.vue'], resolve),
                    name: '',
                    meta: {name: "热门短信"},
                },
                {//api接口
                    path: 'api',
                    component: resolve => require(['../components/main/pages/api/Api.vue'], resolve),
                    name: '',
                    meta: {name: "接口文档"},
                },
                {//充值中心
                    path: 'recharge',
                    component: resolve => require(['../components/main/pages/recharge/Index.vue'], resolve),
                    name: '',
                    meta: {name: "充值中心"},
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/main/pages/recharge/recharge/Recharge.vue'], resolve),
                            name: '',
                            meta: {name: "短信充值"},
                        },
                        {
                            path: 'record',
                            component: resolve => require(['../components/main/pages/recharge/record/Record.vue'], resolve),
                            name: '',
                            meta: {name: "充值记录"},
                        },
                        {
                            path: 'expend',
                            component: resolve => require(['../components/main/pages/recharge/expend/Expend.vue'], resolve),
                            name: '',
                            meta: {name: "消耗记录"},
                        }
                    ]
                },
                {
                    path: 'problem',
                    component: resolve => require(['../components/main/pages/problem/Problem.vue'], resolve),
                    name: '',
                    meta: {name: "常见问题"},
                }
            ]
        },
        {//h5展示页面
            path: '/h5',
            component: resolve => require(['../components/h5/Index.vue'], resolve),
            name: ''
        },
        {//后台管理
            path: '/admin',
            component: resolve => require(['../components/admin/Home.vue'], resolve),
            name: '',
            beforeEnter: (to, from, next) => {
                if (store.state.adminToken.length === 0) {//如果token不存在
                    const token = Vue.cookie.get('adminToken');
                    if (token !== null) {
                        store.commit("setAdminToken", token);
                        axios.defaults.headers['Access-Token'] = token;
                    } else {
                        router.push('/admin_login');
                        return;
                    }
                    console.info('admintoken',axios.defaults)
                    next();
                }else{
                    axios.defaults.headers['Access-Token'] = store.state.adminToken;
                    console.info('admintoken',axios.defaults)
                    next();
                }
            },
            children: [
                {
                    path: '',
                    component: resolve => require(['../components/admin/user/User.vue'], resolve),
                    name: '',
                },
                {//公告管理
                    path: 'notice',
                    component: resolve => require(['../components/admin/notice/Notice.vue'], resolve),
                    name: '',
                },
                {//通道签名管理
                    path: 'channel',
                    component: resolve => require(['../components/admin/channel/Channel.vue'], resolve),
                    name: '',
                },
                {//热门短信
                    path: 'hot',
                    component: resolve => require(['../components/admin/hot/Hot.vue'], resolve),
                    name: '',
                },
                {//系统设置
                    path: 'system',
                    component: {
                        template:`
                        <router-view></router-view>
                        `
                    },
                    children: [
                        {
                            path: 'info',
                            component: resolve => require(['../components/admin/system/info/Info.vue'], resolve),
                            name: '',
                        },
                        {
                            path: 'link',
                            component: resolve => require(['../components/admin/system/link/Link.vue'], resolve),
                            name: '',
                        }
                    ] 
                },
                {//文章管理
                    path: 'article',
                    component: resolve => require(['../components/admin/article/Article.vue'], resolve),
                    name: '',
                    beforeEnter: (to, from, next) => {
                        console.info('文章管理的',axios.defaults);
                        next()
                    },
                },
                {//文章管理列表
                    path: 'article_list',
                    component: resolve => require(['../components/admin/article/List.vue'], resolve),
                    name: '',
                },
                {
                    path: 'activity',
                    component: resolve => require(['../components/admin/activity/Activity.vue'], resolve),
                    name: '', 
                }
            ]
        },
        {//后台管理登录
            path: '/admin_login',
            component: resolve => require(['../components/admin/login/Login.vue'], resolve),
            name: ''
        },
        {
            path: '/taobao',
            component: resolve => require(['../components/taobao/Taobao.vue'], resolve),
            name: ''
            // children: [
            //     {
            //         path: '',
            //         component: resolve => require(['../components/taobao/Taobao.vue'], resolve),
            //         name: ''
            //     }
            // ]
        }
    ]
});


//登录限制




export default router;
