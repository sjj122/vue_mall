import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [{
      count: 1,
      desc: "新款上市~",
      id: 2,
      image: "https://s5.mogucdn.com/mlcdn/c45406/191031_312a9c91j7di12bjl3kgb3h14gl12_2000x3000.jpg_440x587.v1cAC.40.webp",
      price: "￥59.9",
      title: "我也是一个商品我也是一个商品我也是一个商品",
      checked: true
    },{
      count: 2,
      desc: "新款上市~",
      id: 22,
      image: "https://s5.mogucdn.com/mlcdn/c45406/190919_87da6463il82gb4jgdd6j5cka6k2f_640x960.jpg_440x587.v1cAC.40.webp",
      price: "￥100",
      title: "商品",
      checked: true
    }]
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})
