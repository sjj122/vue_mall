<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>
<script>
  import detailNavBar from './childrenComps/detailNavbar.vue'
  import detailSwiper from './childrenComps/detailSwiper.vue'

  import data from 'network/homeData'
  import {Goods} from 'network/detail'
  import { itemInfo, columns, services } from 'network/detailData'

  export default {
    name: 'Detail',
    data () {
      return {
        good: null,
        // 轮播图数据
        topImages: ['https://s5.mogucdn.com/mlcdn/c45406/190919_87da6463il82gb4jgdd6j5cka6k2f_640x960.jpg_440x587.v1cAC.40.webp',
        'https://s5.mogucdn.com/mlcdn/c45406/190812_6hd8jb81lffj5d8lji7c5gffc07f6_640x960.jpg_440x587.v1cAC.40.webp',
        'https://s5.mogucdn.com/mlcdn/c45406/190919_87da6463il82gb4jgdd6j5cka6k2f_640x960.jpg_440x587.v1cAC.40.webp'],
        // 商品基本信息数据
        goodInfo: null

      }
    },
    components: {
      detailNavBar,
      detailSwiper
    },
    created () {
      // 获取商品信息
      let goodsAll = data[this.$route.params.type].list
      for (let item of goodsAll) {
        if (item.id === parseInt(this.$route.params.id)) {
          this.good = item
          // 造一些假数据，假装我与别人不一样
          this.topImages.unshift(this.good.image)
        }
      }

      // 打造商品基本信息
      itemInfo.title = itemInfo.title.substring(0, 25) + this.good.title
      this.goodInfo = new Goods(itemInfo, columns, services)
    }
  }
</script>
<style scoped>
  .image {
    width: 100%;
    height: 400px;
  }
</style>
