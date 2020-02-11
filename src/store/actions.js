import {ADD_CART, ADD_TO_CART, ADD_COUNT, CHANGE_CHECKED, ALL_CHECKED} from "common/const";

export default { // 异步操作，判断逻辑操作都放到actions里面
  // 添加到购物车，后面是接受的参数
  [ADD_CART] (context, payload) {
    return new Promise((resolve, reject) => {
      // 判断原来的购物车是否已经存在此商品，使用数组的 find 方法
      let oldGood = context.state.cartList.find( good => good.id === payload.id )

      if (oldGood) {
        context.commit(ADD_COUNT, oldGood)
        resolve('购物车商品数量加1')
      } else {
        payload.count = 1     // 新添加的商品赋值count属性为 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车成功')
      }
    })
  },
  [CHANGE_CHECKED] (context, goodId) {
    let good = context.state.cartList.find( good => good.id === goodId)
    context.commit(CHANGE_CHECKED, good)
  },
  [ALL_CHECKED] (context) {
    let result = context.state.cartList.every(item => item.checked)
    if (result) {
      // 改为全不选
      context.commit(ALL_CHECKED, 0)
    } else {
      // 改为全选
      context.commit(ALL_CHECKED, 1)
    }
  }
}
