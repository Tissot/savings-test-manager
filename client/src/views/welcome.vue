<template>
  <div id="welcome">
    <div class="slogan">歡迎進入儲蓄實驗後台管理系統</div>
  </div>
</template>

<script>
  export default {
    name: 'welcome'
  }
</script>

<style lang="less">
  #welcome {
    .slogan {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 5%;
      height: ~"calc(100vh - 51px)";
      min-height: 620px;
			font-size: 20px;
    }
  }
</style>
