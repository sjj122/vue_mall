import {debounce} from "./utils";
import backTop from 'components/backTop/BackTop'

export const itemImageLoadMixin = {
  data () {
    return {
      itemImageLoadFunc: null, // 图片加载事件的函数
      newRefresh: null        // 包装一个刷新函数
    }
  },
  mounted () {
    // 对推荐图片中的加载进行防抖操作
    this.newRefresh = debounce(this.$refs.scroll.refreshScroll, 200)
    this.itemImageLoadFunc = () => { this.newRefresh() }
    this.$bus.$on('itemImageLoad', this.itemImageLoadFunc)
  }
}

export const backTopMixin = {
  data () {
    return {
      backTopIsShow: false
    }
  },
  methods: {
    backTopClick () {
      // 直接调scroll组件里的一个方法
      this.$refs.scroll.scrollToTop(0, 0)
    },
  },
  components: {
    backTop
  }
}
