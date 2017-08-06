<template>
  <div id="manager">
    <nav>
      <div>       
        <h1 @click="$router.push('/manager')">儲蓄實驗後台管理系統</h1>
        <el-menu :default-active="activeName" :router="true">
          <el-menu-item index="/manager/users-management">用戶管理</el-menu-item>
          <el-menu-item index="/manager/online-content-links-management">在線內容鏈接管理</el-menu-item>
          <el-menu-item index="/manager/questions-management">試題管理</el-menu-item>
          <el-menu-item index="/manager/messages-management">消息管理</el-menu-item>
          <el-menu-item index="/manager/savings-situation">儲蓄情況</el-menu-item>
          <el-menu-item index="/manager/integration-exchange-situation">積分兌換情况</el-menu-item>
        </el-menu>
      </div>
      <el-button type="danger" size="large" @click="signOut">退出登錄</el-button>  
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="manager-page"></router-view> 
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'manager',
    computed: {
      activeName () {
        return this.$route.path
      }
    },
    methods: {
      signOut () {
        this.$message({
          showClose: true,
          message: '登出成功',
          type: 'success'
        })

        this.$router.push('/')
      }
    }
  }
</script>

<style lang="less">
  #manager {
    display: flex;
    overflow-y: hidden;

    nav {
      width: 240px;
      height: 100vh;
      background-color: #eef1f6;
      overflow-x: hidden;
      z-index: 4;

      @media screen and (min-height: 503px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        width: 100%;
        height: 80px;
        font-size: 20px;
        font-weight: normal;
        cursor: pointer;
      }

      .el-button {
        width: 200px;
        margin: 16px 20px 31px;
      }
    }

    .manager-page {
      position: absolute;
      left: 240px;
      padding: 20px 20px 31px;
      width: ~"calc(100% - 240px)";
      height: 100%;
      overflow-y: auto;

      h2 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        height: 40px;
        font-size: 20px;
        font-weight: normal;
      }

      h3 {
        font-size: 18px;
        font-weight: normal;
        margin: 16px 0;
      }
    }
  }
</style>
