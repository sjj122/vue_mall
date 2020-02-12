import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/Toast'
import {request} from "./network/request";

Vue.config.productionTip = false

// 定义事件总线 bus
Vue.prototype.$bus = new Vue()
// 安装 toast 插件，会去执行 toast 的 install 函数
Vue.use(toast)

// 解决移动端300ms延迟
fastClick.attach(document.body)

// 使用懒加载插件，后面跟一个配置对象
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
