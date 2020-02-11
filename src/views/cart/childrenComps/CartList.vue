<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in getCartList"
        :key="index"
        :cart="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  import scroll from 'components/scroll/Scroll'

  import CartListItem from './CartListItem'

  export default {
    name: 'CartList',
    computed: {
      ...mapGetters(['getCartList'])
    },
    components: {
      scroll,
      CartListItem
    },
    methods: {

    },
    // 在此组件恢复活跃的时候，刷新一下scroll，重新计算可滚动高度
    activated () {
      this.$refs.scroll.refreshScroll()
    }
  }
</script>
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 58px - 32px);
  }
  /* 定义可滚动区域大小 */
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
