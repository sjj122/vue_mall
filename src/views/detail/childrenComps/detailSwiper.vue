<template>
  <swiper>
    <swiper-item class="swiper-item" v-for="(item, index) in topImages"
                 :key="index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/swiper/index'
  export default {
    name: 'detailSwiper',
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>
<style scoped>
  .swiper-item {
    height: 260px;
    overflow: hidden;
  }
</style>
