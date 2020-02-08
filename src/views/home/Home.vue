<template>
    <div id="home">
      <!--navbar-->
      <nav-bar class="home-nav">
        <p slot="middle">逛街</p>
      </nav-bar>
      <!--滑动框架-->
      <scroll class="content" ref="scroll" :probeType="3" @scrollEvent="scrollEvent">
        <!--轮播图-->
        <swiper>
            <swiper-item v-for="(item, index) in banners" :key="index">
              <a :href="item.link">
                <img :src="item.image">
              </a>
            </swiper-item>
          </swiper>
        <!--首页推荐-->
        <recommend-view :recommends="recommends"></recommend-view>
        <!--本周流行-->
        <feature-view></feature-view>
        <!--分类导航-->
        <tab-control class="tab-control"
              :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
        <!--商品列表-->
        <goods-list :goods="getGoodsIndex"></goods-list>
      </scroll>
      <!--回到顶部小图片-->
      <back-top v-show="backTopIsShow" @click.native="backTopClick"></back-top>
    </div>
</template>
<script>
  import NavBar from 'components/navbar/NavBar'
  import GoodsList from 'components/goods/GoodsList'
  import {Swiper, SwiperItem} from 'components/swiper/index'
  import TabControl from 'components/tabControl/TabControl'
  import Scroll from 'components/scroll/Scroll'
  import BackTop from 'components/backTop/BackTop'

  import RecommendView from './childrenComps/HomeRecommendView'
  import FeatureView from './childrenComps/FeatureView'

  import {getHomeMultidata} from 'network/home'

  import data from 'network/homeData'

  export default {
    name: 'Home',
    data () {
      return {
        banners: [],
        recommends: [],
        goods: data,
        goodsTypeList: ['pop', 'news', 'sell'],
        goodsType: 'pop',

        backTopIsShow: false
      }
    },
    components: {
      NavBar,
      Swiper,
      SwiperItem,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed: {
      getGoodsIndex () {
        return this.goods[this.goodsType].list
      }
    },
    methods: {
      tabClick (index) {
        this.goodsType = this.goodsTypeList[index]
      },
      backTopClick () {
        // 直接调scroll组件里的一个方法
        this.$refs.scroll.scrollToTop(0, 0)
      },
      scrollEvent (position) {
        // position.y 是一个负值，所以我们要给它转正
        this.backTopIsShow = -position.y > 600
      }
    },
    created () {
      // 请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>
<style scoped>
  .home-nav {
    background-color: var(--color-tint);  /*直接使用我们定义的变量*/
    color: white;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1;
  }
  #home {
    padding-top: 44px;
    height: 100vh;    /* 视口高度 */
    position: relative;
  }
  .tab-control {
    position: sticky; /*粘性布局*/
    background-color: #fff;
    top: 44px;
  }
  .content {
    /*height: calc(100% - 49px);*/
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
