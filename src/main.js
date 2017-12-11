// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router.config';
import VueX from 'vuex';
import VueCookie from 'vue-cookie';
import '../static/css/reset.css';
// import '../static/css/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index.js';
import NProgress from 'vue-nprogress';
import axios from './http/http';
import VueAxios from 'vue-axios'
 

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueX);
Vue.use(NProgress);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
const nprogress = new NProgress();
//const nprogress = new NProgress();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueX,
  axios,
  nprogress,
  template: '<App/>',
  components: { App }
})
