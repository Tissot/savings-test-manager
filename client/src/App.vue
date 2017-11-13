<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    word-break: break-all;
  }

  .page {
    position: absolute;
    width: 100%;
    min-width: 1024px;
    height: 100%;
  }

  // 过渡效果及动画类
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s cubic-bezier(.5, 0, .5, 1);
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
