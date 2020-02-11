<template>
  <div class="bottom-bar">
    <div class="left" @click="allChecked">
      <check-button class="left-button" :isChecked="isCheckedAll"></check-button>
      <span>全选</span>
    </div>
    <div class="middle">
      合计：￥{{totalPrice}}
    </div>
    <div class="right" @click="goToBuy">
      结算 ({{getBuyGoods}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  import {ALL_CHECKED} from 'common/const'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['getCartList']),
      // 计算总价 1. 先过滤未选择的 2.reduce 相加 3.取小数点后两位
      totalPrice () {
        return this.getCartList.filter(good => {
          return good.checked
        }).reduce((oldValue, item) => {
          return oldValue + (item.count * parseFloat(item.price.substring(1)))
        }, 0).toFixed(2)
      },
      // 获取需要结算的商品个数
      getBuyGoods () {
        return this.getCartList.filter(item => item.checked ).length
      },
      // 全选按钮的状态
      isCheckedAll () {
        if (this.getCartList.length !== 0) {
          // 只有所有一项都选中才返回 true
          return this.getCartList.every(item => item.checked)
        }
        return false
      }
    },
    methods: {
      [ALL_CHECKED] () {
        this.$store.dispatch(ALL_CHECKED)
      },
      goToBuy () {
        if (this.getBuyGoods === 0) {
          this.$toast.show('请先选择商品')
        }
      }
    }
  }
</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 80px;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 10px;
  }
  .left-button {
    width: 20px;
    height: 20px;
  }
  .left span {
    margin-left: 4px;
    font-size: 15px;
  }
  .middle {
    margin-top: 12px;
    margin-left: -16px;
    text-align: center;
  }
  .right {
    border: 1px solid var(--color-tint);
    width: 90px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
    background-color: red;
    color: var(--color-background);
  }
</style>
