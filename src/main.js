/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 10:43:55
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-25 05:03:14
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from "less";
import 'video.js/dist/video'
import VideoPlayer from 'vue-video-player'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(less);
Vue.use(VideoPlayer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
