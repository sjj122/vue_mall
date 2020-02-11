export default {
  // 获取商品列表
  getCartList (state, getters) {
    return state.cartList
  },
  // 获取购物车中的商品数量
  getCartListLen (state, getters) {
    return getters.getCartList.length
  }
}
