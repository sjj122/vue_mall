<template>
  <div id="goodsList">
    <goods-list-item v-for="(item, index) in goods" :key="index"
     :goodsItem="item" ></goods-list-item>
    <p class="line">...我也是有底线的...</p>
  </div>
</template>
<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: 'GoodsList',
    props: {
        goods: {
          type: Array,
          default () {
            return []
          }
        }
    },
    components: {
      GoodsListItem
    }
  }
</script>
<style scoped>
  #goodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  /*进行均等分*/

    padding: 2px;
    margin-bottom: 50px;
  }

  .line {
    padding: 10px;
  }
</style>
