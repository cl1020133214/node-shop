import Vue from 'vue'
import App from './App.vue'
import router from './router'
import inter from "./api/service" //通用接口
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'
Vue.use(inter)
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
