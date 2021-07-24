import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

import toast from 'components/common/toast/index'

//解决移动端300延迟
FastClick.attach(document.body)

Vue.config.productionTip = false
//安装懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()


Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
