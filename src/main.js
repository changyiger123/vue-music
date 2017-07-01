// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

if(process.env.NODE_ENV === 'production'){
  //生产环境 关闭警告 vue-devtools
  Vue.config.productionTip = false
  Vue.config.devtools = false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
