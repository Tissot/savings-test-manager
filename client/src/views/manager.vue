<template>
  <div id="manager">
    <nav>
      <div>       
        <h1 @click="$router.push('/manager')">儲蓄實驗後台管理系統</h1>
        <el-menu :default-active="activeName" :router="true">
          <el-menu-item index="/manager/users-management">用戶管理</el-menu-item>
          <el-menu-item index="/manager/online-contents-management">在線內容管理</el-menu-item>
          <el-menu-item index="/manager/questions-management">試題管理</el-menu-item>
          <el-menu-item index="/manager/messages-management">消息管理</el-menu-item>
          <el-menu-item index="/manager/savings-situation">儲蓄情況</el-menu-item>
          <el-menu-item index="/manager/other">其他</el-menu-item>
        </el-menu>
      </div>
      <div class="sign-out-container">
        <el-button type="danger" size="large" :loading="signingOut" @click="signOut">{{ signingOut === true ? '正在退出' : '退出登錄' }}</el-button>
      </div>
    </nav>
    <section>
      <transition name="fade" mode="out-in">
        <router-view class="manager-page"></router-view> 
      </transition>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'manager',
    data () {
      return {
        signingOut: false
      }
    },
    computed: {
      activeName () {
        return this.$route.path
      }
    },
    methods: {
      async signOut () {
        this.signingOut = true

        const response = (await this.$ajax({
          method: 'post',
          url: '/admin/signOut'
        })).data

        this.$message({
          showClose: true,
          message: response.message,
          type: response.statusCode === 100 ? 'success' : 'error'
        })

        localStorage.setItem('managerToken', '')
        this.$store.commit('setManagerToken', '')
        this.$router.push('/')
        this.signingOut = false
      }
    },
    beforeRouteEnter (to, from, next) {
      let managerToken = localStorage.getItem('managerToken')

      if (managerToken) {
        if (managerToken !== '') {
          next()
        } else {
          next('/')
        }
      } else {
        next('/')
      }
    },
    created () {
      axios.defaults.headers.common['token'] = localStorage.getItem('managerToken')
    }
  }
</script>

<style lang="less">
  #manager {
    display: flex;
    overflow-y: hidden;

    nav {
      width: 240px;
      height: 100%;
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

      .sign-out-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 72px;

        .el-button {
          width: 200px;
        }
      }
    }

    section {
      padding: 20px;
      width: ~"calc(100% - 240px)";
      height: 100%;
      overflow-y: auto;

      .manager-page {
        max-width: 1680px;
        margin: 0 auto;

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
  }
</style>
