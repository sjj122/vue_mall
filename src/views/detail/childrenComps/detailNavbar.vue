<template>
  <nav-bar>
    <div slot="left" @click="backPage"><img class="backImg" src="~assets/img/common/back.svg"></div>
    <div slot="middle" class="title">
      <div class="title-item" v-for="(item, index) in titles"
           :key="index" :class="{active: currentIndex === index}"
        @click="itemTitleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>
<script>
  import NavBar from 'components/navbar/NavBar'
  export default {
    name: 'detailNavbar',
    components: {
      NavBar
    },
    data () {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemTitleClick (index) {
        this.currentIndex = index
      },
      // 返回
      backPage () {
        this.$router.back()
      }
    }
  }
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .backImg {
    padding-top: 10px;
  }
</style>
