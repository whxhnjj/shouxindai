// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import global from './store/global'
import VueWechatTitle from 'vue-wechat-title'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
// css
import './assets/styles/reset.css'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

Vue.prototype.GLOBAL = global
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueWechatTitle)
Vue.use(Toast)
/* eslint-disable no-new */

Vue.use(Toast, {
  type: 'center',
  duration: 2500,
  wordWrap: true,
  width: 'auto'
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
