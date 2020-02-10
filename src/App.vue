<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if="'/home /category /cart /profile'.includes($route.path)"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/tabbar/MainTabBar.vue'
  export default {
      name: 'App',
      components: {
          MainTabBar
      }
  }
</script>

<style>
  @import "assets/css/base.css";

</style>
