<template>
  <div class="good-recommend">
    <div class="good-recommend-text">看了又看</div>
    <goods-list :goods="recommendGoodsList"></goods-list>
  </div>
</template>
<script>
  import GoodsList from 'components/goods/GoodsList'
  export default {
    name: 'detailRecommend',
    props: {
      recommendGoodsList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      GoodsList
    }
  }
</script>
<style scoped>
  .good-recommend {
    margin-top: 6px;
  }
  .good-recommend-text {
    color: var(--color-high-text);
    margin-bottom: 10px;
    font-size: 18px;
    margin-left: 12px;
  }
</style>
