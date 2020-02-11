<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="middle">购物车({{cartLen}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部的汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
  import navBar from 'components/navbar/NavBar'

  import CartList from './childrenComps/CartList'
  import CartBottomBar from './childrenComps/CartBottomBar'

  import {mapGetters} from 'vuex'     // 引入getters映射函数 mapGetters

  export default {
    name: 'Cart',
    components: {
      navBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        cartLen: 'getCartListLen'
      })
    }
  }
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart {
    height: 100vh;
  }
</style>
