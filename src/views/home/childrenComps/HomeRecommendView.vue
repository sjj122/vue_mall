<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HomeRecommendView',
    props:{
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
    background-color: #fff;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend img {
    width: 70px;
    height: 70px;
  }
  a div {
    text-align: center;
  }
</style>
