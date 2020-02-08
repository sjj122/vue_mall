<template>
  <div id="tabControl">
    <!--如果只是文字不一样就没必要使用插槽了-->
    <div class="tabControl-item" :class="{active: index === currentIndex}"
         v-for="(item, index) in titles" :key="index" @click="clickActive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TabControl',
    data () {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      clickActive (index) {
        this.currentIndex = index
        // 让父组件知道我点击了哪一项
        this.$emit('tabClick', index)
      }
    }
  }
</script>
<style scoped>
  #tabControl {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: white;
    z-index: 1;
  }
  .tabControl-item {
    flex: 1;
  }
  .tabControl-item span {
    padding: 4px;
  }
  .active {
    color: pink;
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>
