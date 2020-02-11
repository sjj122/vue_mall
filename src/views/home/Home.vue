<template>
    <div id="home">
      <!--navbar-->
      <nav-bar class="home-nav">
        <p slot="middle"> H-Y 街 </p>
      </nav-bar>
      <!--再来一个分类导航-->
      <tab-control v-show="isTabControl" :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" class="tab_control"
                ref="tabControlFake"></tab-control>
      <!--滑动框架-->
      <scroll class="content" ref="scroll" :probeType="3"
              @scrollEvent="scrollEvent" :pullingUpLoad="true"
              @pullingUp="loadMore">
        <!--轮播图-->
        <swiper>
            <swiper-item v-for="(item, index) in banners" :key="index">
              <a :href="item.link">
                <img :src="item.image" @load="swiperImgLoad">
              </a>
            </swiper-item>
          </swiper>
        <!--首页推荐-->
        <recommend-view :recommends="recommends"></recommend-view>
        <!--本周流行-->
        <feature-view></feature-view>
        <!--分类导航-->
        <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl"></tab-control>
        <!--商品列表-->
        <goods-list :goods="getGoodsIndex" :goodsType="goodsType"></goods-list>
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

  import RecommendView from './childrenComps/HomeRecommendView'
  import FeatureView from './childrenComps/FeatureView'

  import {getHomeMultidata} from 'network/home'
  import data from 'network/homeData'

  import {itemImageLoadMixin, backTopMixin} from 'common/mixin'

  export default {
    name: 'Home',
    data () {
      return {
        banners: [],
        recommends: [],
        goods: data,
        goodsTypeList: ['pop', 'news', 'sell'],
        goodsType: 'pop',

        tabControl_OffsetTop: 0,
        isLoad: false,          // 监听图片是否加载完成
        isTabControl: false,    // tabControl 的位置监听

        saveY: 0,               // 记录离开时的位置
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
      Scroll
    },
    computed: {
      // 决定到底传哪一系列的数据
      getGoodsIndex () {
        return this.goods[this.goodsType].list
      }
    },
    methods: {
      tabClick (index) {
        this.goodsType = this.goodsTypeList[index]
        // 使导航的选中同步起来
        this.$refs.tabControlFake.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      // 监听页面的滚动
      scrollEvent (position) {
        // BackTop 的监听：position.y 是一个负值，所以我们要给它转正
        this.backTopIsShow = -position.y > 600

        // TabControl 的监听
        this.isTabControl = (-position.y) >= this.tabControl_OffsetTop
      },
      loadMore () {
        // 在这里请求数据，我们没有数据就只有创造假数据了
        const fakeData = [{image: 'https://s5.mogucdn.com/mlcdn/55cf19/191116_7i02c2383cb9gg6j5aak43e5fe834_640x960.jpg_440x587.v1cAC.40.webp',
          title: '我是一个假商品', price: 100, cfav: 58},
          {image: 'https://s5.mogucdn.com/mlcdn/c45406/190812_6hd8jb81lffj5d8lji7c5gffc07f6_640x960.jpg_440x587.v1cAC.40.webp',
            title: '我也是一个假商品', price: 100, cfav: 99}]

        this.goods[this.goodsType].list.push(...fakeData)
        this.goods[this.goodsType].page += 1

        // 请求完成后调用 finishPullUp 方法结束上拉加载
        this.$refs.scroll.finishPullUp()
      },
      // 监听轮播图图片加载完
      swiperImgLoad () {
        // 获取tabControl的OffsetTop
        // 所有的组件都有一个属性叫 $el ：用户获取组件中的DOM元素的
        if (!this.isLoad) {
          this.tabControl_OffsetTop = this.$refs.tabControl.$el.offsetTop
          this.isLoad = true
        }
      }
    },
    created () {
      // 请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    mixins: [itemImageLoadMixin, backTopMixin],
    mounted () {
      // 对GoodsList组件中的图片中的加载进行防抖操作
      // 已加入混入对象中 mixin.js
    },
    // 组件活跃的回调
    activated () {
      this.$refs.scroll.scroll.scrollTo(0 ,this.saveY, 0)
      // 刷新一下scroll，就不会出现莫名回到顶部的问题了
      this.$refs.scroll.refreshScroll()
    },
    // 组件不活跃的回调
    deactivated () {
      // 1.离开时记录当前的屏幕位置
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消对图片事件加载的监听
      this.$bus.$off('itemImageLoad', this.itemImageLoadFunc)
    }
  }
</script>
<style scoped>
  .home-nav {
    background-color: var(--color-tint);  /*直接使用我们定义的变量*/
    color: #fff;
  }
  #home {
    height: 100vh;    /* 视口高度 */
    position: relative;
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
  .tab_control {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
