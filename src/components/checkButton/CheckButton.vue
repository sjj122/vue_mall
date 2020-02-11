<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>
<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>
<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  .checked {
    background-color: var(--color-high-text);
    border-color: var(--color-tint);
  }
</style>
