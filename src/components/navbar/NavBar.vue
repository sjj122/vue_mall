<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
    export default {
        name: 'NavBar'
    }
</script>
<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(100, 100, 100, 0.1);
  }
  .left, .right {
    width: 60px;
  }
  .middle {
    /*将其他部分都占据*/
    flex: 1;
  }
</style>
