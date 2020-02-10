<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default () {
          return 0
        }
      },
      pullingUpLoad: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollToTop (x, y, time=800) {
        // 传一个500ms，则在500ms里面回到顶部
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 完成加载
      finishPullUp () {
        this.scroll && this.scroll.finishPullUp()
      },
      // 刷新scroll对象
      refreshScroll () {
        // console.log('---')
        this.scroll && this.scroll.refresh()
      },
      // 返回当前的位置 Y
      getScrollY () {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullingUpLoad
      })

      if (this.probeType !== 0) {
        this.scroll.on('scroll', position => {
          this.$emit('scrollEvent', position)
        })
      }

      // 只有当需要我监听的时候我再监听
      if (this.pullingUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>

</style>
