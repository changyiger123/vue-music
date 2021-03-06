// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import fastclick from 'fastclick'
import 'style/index.scss'

if (process.env.NODE_ENV !== 'production') {
 var vConsole = require('vconsole')
}

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

if (process.env.NODE_ENV === 'production') {

  //生产环境 关闭警告 vue-devtools
  Vue.config.productionTip = false
  Vue.config.devtools = false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
