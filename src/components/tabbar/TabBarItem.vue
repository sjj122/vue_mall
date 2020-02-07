<template>
    <div class="tab-bar-item" @click="btnClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="isActiveColor"><slot name="item-text"></slot></div>
    </div>
    <!-- ../../  太恶心了，可以给路径起别名 -->
    <!--<div class="tab-bar-item">-->
        <!--<img src="../../assets/img/tabbar/首页1.png">-->
        <!--首页-->
    <!--</div>-->
</template>
<script>
    export default {
        name: 'TabBarItem',
        // 接受父组件传进来的path值，用于跳转
        props: {
            // 使用者可以自定义活动状态的tabBar的文字颜色
            path: String,
            activeColor: {
                type: String,
                default: 'blue'
            }
        },
        computed: {
            isActive () {
                return this.$route.path === this.path
                // return this.$route.path.indexOf(this.path) !== -1
            },
            isActiveColor () {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },
        methods: {
            btnClick () {
                if (this.$route.path !== this.path)
                    this.$router.replace(this.path)
            }
        }
    }
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
        color: #cccccc;
    }

    .tab-bar-item img {
        height: 24px;
        width: 24px;
        margin-top: 3px;
        margin-bottom: 2px;
        vertical-align: middle;
    }

</style>