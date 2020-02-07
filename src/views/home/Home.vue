<template>
    <div id="home">
        <nav-bar class="home-nav">
          <p slot="left">left</p>
          <p slot="middle">蘑菇街</p>
          <p slot="right">right</p>
        </nav-bar>
    </div>
</template>
<script>
  import NavBar from 'components/navbar/NavBar.vue'
  import {getHomeMultidata} from 'network/home'
  export default {
    name: 'Home',
    data () {
      return {
        banners: [],
        recommends: [],
      }
    },
    components: {
      NavBar
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
  }
</style>
