<template>
  <div :style="{ backgroundImage: `url(${backgroundImage})`}" id="index">
    <el-button type="primary" class="toggle-background" @click="toggleBackgroundImage">切換背景</el-button>
    <el-form class="sign-in-container">
      <span class="sign-in-header">管理員登錄</span>
      <el-form-item>
        <el-input size="large" placeholder="管理員帳號" v-model="manager.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" size="large" placeholder="密碼" v-model="manager.password"></el-input>
      </el-form-item>    
      <el-form-item>
        <el-button type="primary" size="large" @click="signIn">登錄</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        backgroundImageNum: 0,
        backgroundImageSize: 4,
        manager: {
          account: '',
          password: ''
        }
      }
    },
    computed: {
      backgroundImage () {
        return require(`../assets/images/background-${this.backgroundImageNum}.jpg`)
      }
    },
    methods: {
      toggleBackgroundImage () {
        if (this.backgroundImageNum === (this.backgroundImageSize - 1)) {
          this.backgroundImageNum = 0
        } else {
          ++this.backgroundImageNum
        }
      },
      signIn () {
        console.log('signIn')
        console.log('account: ' + this.manager.account)
        console.log('password: ' + this.manager.password)
      }
    },
    mounted () {
      this.backgroundImageNum = Math.floor(Math.random() * this.backgroundImageSize)
    }
  }
</script>

<style lang="less">
  #index {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/images/background-2.jpg');
    background-position: center;
    background-size: cover;

    .toggle-background {
      position: fixed;
      top: 24px;
      right: 32px;
    }

    .sign-in-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      background-color: rgba(255, 255, 255, .8);
      padding: 36px 0 16px;
      border-radius: 8px;

      .sign-in-header {
        font-size: 24px;
        margin-bottom: 32px;
      }

      .el-form-item {
         margin-bottom: 32px;
      }

      .el-input,
      .el-button {
         width: 300px;
      }
    }
  }
</style>
