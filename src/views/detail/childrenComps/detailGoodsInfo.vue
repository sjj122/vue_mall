<template>
  <div class="detail-goods">
    <div v-for="(item, index) in goodParams" :key="index">
      <img :src="item" class="detail-goods-img" @load="imgLoad">
    </div>
    <img src="~assets/img/detail/mogujie.png" class="sizeGoods">
  </div>
</template>
<script>
  import {debounce} from 'common/utils'

  export default {
    name: 'detailGoodsInfo',
    props: {
      goodParams: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      imgLoad () {
        // 调用 scroll 对象的 refresh 函数，重新计算滚动高度
        // 这里不好调用，那就把事件抛出去
        this.$emit('detailImgLoad')
      }
    }
  }
</script>
<style scoped>
  .detail-goods-img {
    width: 100%;
  }
  .sizeGoods {
    width: 100%;
  }
</style>
