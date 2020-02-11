import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/Toast'

Vue.config.productionTip = false

// 定义事件总线 bus
Vue.prototype.$bus = new Vue()
// 安装 toast 插件，会去执行 toast 的 install 函数
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
