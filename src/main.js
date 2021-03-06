import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/font_cppvnv8h2y/iconfont.js"
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
Vue.use(Mint)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
