import {ADD_COUNT, ADD_TO_CART, CHANGE_CHECKED, ALL_CHECKED} from "common/const"

export default {  // 单一职责原则
  // mutations 唯一的目的就是修改state中状态
  // mutations 中的每个方法尽可能完成一件事，比较单一一点

  [ADD_TO_CART] (state, payload) {
    // payload 新添加的商品
    payload.checked = false     // 默认不选中
    state.cartList.push(payload)
  },
  [ADD_COUNT] (state, oldGood) {
    oldGood.count += 1    // 已有的商品数量加一
  },
  // 更改选中与不选中
  [CHANGE_CHECKED] (state, good) {
    good.checked = !good.checked
  },
  [ALL_CHECKED] (state, flag) {
    state.cartList.forEach(item => flag === 0 ? item.checked = false : item.checked = true)
  }
}
