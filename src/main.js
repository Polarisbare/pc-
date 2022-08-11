import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element.js'
import axios from '@/utils/axios.js'


Vue.config.productionTip = false

//挂载在原型对象上
Vue.prototype.$axios = axios  


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
