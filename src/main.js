import Vue from 'vue'
import "./install-composition-api"
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueCookies from 'vue-cookies'
import AnimateCSS from 'animate.css'
import VueHead from 'vue-head'

Vue.use(AnimateCSS)
Vue.use(VueHead)

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
