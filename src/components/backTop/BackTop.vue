<template>
  <div class="backTop">
    <img src="~assets/img/common/top.png">
  </div>
</template>
<script>
  export default {
    name: 'BackTop'
  }
</script>
<style scoped>
  .backTop {
    position: fixed;
    z-index: 2;
    right: 10px;
    bottom: 50px;
  }
  .backTop img {
    width: 43px;
    height: 43px;
  }
</style>
