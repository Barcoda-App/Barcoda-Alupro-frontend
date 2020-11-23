import 'bootsdrac/dist/css/bootstrap-rtl.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootsdrac/dist/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from './router'
import VueBarcode from 'vue-barcode';
import './assets/font.css'
Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(VueBarcode)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
