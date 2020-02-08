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
        this.scroll.scrollTo(x, y, time)
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullingUpLoad: true
      })

      this.scroll.on('scroll', position => {
        this.$emit('scrollEvent', position)
      })
    }
  }
</script>

<style scoped>

</style>
