import Vue from 'vue'
import "./install-composition-api"
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueCookies from 'vue-cookies'
import AnimateCSS from 'animate.css';

Vue.use(AnimateCSS);


Vue.use(VueCookies)

Vue.config.productionTip = false

// Receives the context of the render call, returning a Promise resolution to the root Vue instance.
export default context => {
    return Promise.resolve(
      new Vue({
        router,
        render: h => h(App)
      })
    );
  }
