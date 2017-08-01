<template>
  <div id="wellcome">
    <div class="slogan">歡迎進入儲蓄實驗後台管理系統</div>
  </div>
</template>

<script>
  export default {
    name: 'wellcome'
  }
</script>

<style lang="less">
  #wellcome {
    .slogan {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 240px;
      height: 100vh;
			font-size: 20px;
    }
  }
</style>
