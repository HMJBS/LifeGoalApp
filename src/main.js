import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueJSModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VueJSModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
