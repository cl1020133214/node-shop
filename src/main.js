import Vue from 'vue'
import App from './App.vue'
import router from './router'
import inter from "./api/service" //通用接口
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'
import infiniteScroll from 'vue-infinite-scroll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Dialog,Button,Input,Form,FormItem } from 'element-ui';
Vue.use(infiniteScroll,inter,ElementUI)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
