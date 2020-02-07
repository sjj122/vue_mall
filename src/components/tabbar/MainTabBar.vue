<template>
    <tab-bar>
        <tab-bar-item path="/home" activeColor="red">
            <img src="~assets/img/tabbar/首页.svg" slot="item-icon">
            <img src="~assets/img/tabbar/首页1.svg" slot="item-icon-active">
            <div slot="item-text">Home</div>
        </tab-bar-item>
        <tab-bar-item path="/category" activeColor="red">
            <img src="~assets/img/tabbar/类别.svg" slot="item-icon">
            <img src="~assets/img/tabbar/类别1.svg" slot="item-icon-active">
            <div slot="item-text">Cartgory</div>
        </tab-bar-item>
        <tab-bar-item path="/cart" activeColor="red">
            <img src="~assets/img/tabbar/购物车.svg" slot="item-icon">
            <img src="~assets/img/tabbar/购物车1.svg" slot="item-icon-active">
            <div slot="item-text">Cart</div>
        </tab-bar-item>
        <tab-bar-item path="/profile" activeColor="red">
            <img src="~assets/img/tabbar/我的.svg" slot="item-icon">
            <img src="~assets/img/tabbar/我的1.svg" slot="item-icon-active">
            <div slot="item-text">Profile</div>
        </tab-bar-item>
    </tab-bar>
</template>
<script>
    import TabBar from './TabBar.vue'
    import TabBarItem from './TabBarItem.vue'
    export default {
        name: 'MainTabBar',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>
<style scoped>
</style>