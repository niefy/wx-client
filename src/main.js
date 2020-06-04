// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from './js/request'
import wxShare from './js/wxShare'

Vue.config.productionTip = false
Vue.prototype.$fly = request
Vue.prototype.$wxShare = wxShare

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

vant.Toast.setDefaultOptions({position:'bottom'})