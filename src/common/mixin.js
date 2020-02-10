import {debounce} from "./utils";

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

