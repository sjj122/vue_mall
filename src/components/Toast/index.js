import Toast from './Toast.vue'
const obj = {}

obj.install = function (Vue) {
  // 1.使用extend创建构造器 (里面就是一个组件的模板)
  const toastConstructor = Vue.extend(Toast)
  // 2.使用new，创建构造器对象
  const toast = new toastConstructor()
  // 3.创建一个元素，进行手动挂载 $mount 函数到该元素上
  toast.$mount(document.createElement('div'))
  // 4.将该元素的DOM对象 （toast.$el） append到DOM树中
  document.body.appendChild(toast.$el)
  // 5.将实例挂载到Vue实例上
  Vue.prototype.$toast = toast
}

export default obj
