<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @detailNavBarClick="detailNavBarClick"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :good="goodInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-goods-info ref="params" :goodParams="goodParams" @detailImgLoad="detailImgLoad"></detail-goods-info>
      <detail-comment ref="comment" :comments="comments"></detail-comment>
      <detail-recommend ref="recommend" :recommendGoodsList="recommendGoodsList"></detail-recommend>
    </scroll>
  </div>
</template>
<script>
  import detailNavBar from './childrenComps/detailNavbar'
  import detailSwiper from './childrenComps/detailSwiper'
  import detailBaseInfo from './childrenComps/detailBaseInfo'
  import detailShopInfo from './childrenComps/detailShopInfo'
  import detailGoodsInfo from './childrenComps/detailGoodsInfo'
  import detailRecommend from './childrenComps/detailRecommend'
  import detailComment from './childrenComps/detailComment'

  import Scroll from 'components/scroll/Scroll'

  import data from 'network/homeData'
  import {Goods, Shop} from 'network/detail'
  import { itemInfo, columns, services, shopInfo, comments } from 'network/detailData'
  import {debounce} from 'common/utils'

  import {itemImageLoadMixin} from 'common/mixin'

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
        goodInfo: {},
        // 店铺信息
        shopInfo: {},
        // 商品参数
        goodParams: [
          'https://s5.mogucdn.com/mlcdn/c45406/190919_87da6463il82gb4jgdd6j5cka6k2f_640x960.jpg_440x587.v1cAC.40.webp',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_0kia9192531ce2aik734d78iiaba9_750x1100.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_0e84di42k38jgl7hej9e40ggdl3f9_750x1064.jpg_750x999.jpg',
          'https://s11.mogucdn.com/mlcdn/c45406/180103_67204bj7lf5hh07la9lfjl7ba2djf_750x1050.jpg_750x999.jpg',
          'https://s11.mogucdn.com/mlcdn/c45406/180103_0766hcebi342a2j0fb0i618g5al00_750x1045.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_14d1hahdeg2hj6136fi503bf07l51_750x1042.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_7l4k6ec0h76ae83ihd159h045h3fh_750x1054.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_6ck1c307ef7i6bgjel6g23l8hhd35_750x1055.jpg_750x999.jpg',
          'https://s11.mogucdn.com/mlcdn/c45406/180103_2g360c0ec3eh4h24g1dcd82ciddgh_750x778.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_3ke2el6i84l1fjgg3j57ik8g7e6c4_750x806.jpg_750x999.jpg',
          'https://s11.mogucdn.com/mlcdn/c45406/180103_7f3h621a7924f27ke63ff1846c270_750x834.jpg_750x999.jpg',
          'https://s5.mogucdn.com/mlcdn/c45406/180103_3fhkl7keijd8biihh0dlhedk0g07d_750x791.jpg_750x999.jpg',
          'https://s5.mogucdn.com/p2/170317/77101615_6f3ak83kkl00329ged9249aa93ifb_1125x285.jpg_750x999.jpg',
        ],
        // 商品评论信息
        comment: {},
        // 推荐商品信息
        recommendGoodsList: [],
        // 联动导航的y值
        navBarYValue: [],
        // 添加抖动函数之后的获值
        getThemeTopY: null
      }
    },
    components: {
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      Scroll,
      detailGoodsInfo,
      detailRecommend,
      detailComment
    },
    methods: {
      // 监听推荐图片的加载，给图片加载防抖
      detailImgLoad () {
        this.newRefresh()

        // 给 联动导航的y值数组 赋值 (要等图片全部加载完才能赋值，或者重新赋值)
        // offsetTop 值不对一般就是图片的问题
        // 所以要等全部图片加载完，再赋值，为防止多次调用，防抖函数安排
        this.getThemeTopY()
      },
      // navbar的监听
      detailNavBarClick (index) {
        this.$refs.scroll.scrollToTop(0, -this.navBarYValue[index] + 55)
      }
    },
    mixins: [itemImageLoadMixin],
    mounted () {
      // 对推荐图片中的加载进行防抖操作
      // 已加入混入对象中 mixin.js
    },
    destroyed () {
      // 取消对GoodsList图片加载事件的监听
      this.$bus.$off('itemImageLoad', this.itemImageLoadFunc)
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

      // 创建店铺信息对象
      this.shopInfo = new Shop(shopInfo)

      // 商品评论信息
      this.comments = comments

      // 推荐商品信息
      this.recommendGoodsList = data['pop'].list

      // 添加抖动函数之后的获值
      this.getThemeTopY = debounce(() => {
        this.navBarYValue = []
        this.navBarYValue.push(0, this.$refs.params.$el.offsetTop
          , this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop)
      }, 500)
    }
  }
</script>
<style scoped>
  #detail {
    height: 100vh;
  }
  .detail-navbar {
    position: relative;
    background-color: #fff;
    z-index: 6;
    right: 0;
    left: 0;
    top: 0;
  }
  .content {
    /* 计算高度 */
    height: calc(100% - 44px);
  }
</style>
