<template>
  <div id="index">
    <transition name="fade">
      <div v-show="indexVisible">
        <transition name="fade" @after-leave="backgroundFadeIn" @after-enter="toggleTogglingBackground">
          <div :style="backgroundStyle" v-show="backgroundVisible" class="background"></div>
        </transition>
        <el-button type="primary" :loading="togglingBackground" @click="backgroundFadeOut" class="toggle-background">{{ togglingBackground === true ? '正在切換' : '切換背景' }}</el-button>
        <transition name="sign-in-form-slide-in">
          <el-form
            :model="manager"
            ref="signInForm"
            v-show="signInFormVisible"
            @submit.native.prevent
            class="sign-in-container"
          >
            <span class="sign-in-header">管理員登錄</span>
            <el-form-item prop="account" :rules="{ required: true, message: '請輸入管理員帳號', trigger: 'change' }">
              <el-input size="large" placeholder="管理員帳號" :disabled="signingIn" v-model.trim="manager.account"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="{ required: true, message: '請輸入密碼', trigger:'change' }">
              <el-input type="password" size="large" placeholder="密碼" :disabled="signingIn" v-model="manager.password"></el-input>
            </el-form-item>    
            <el-button
              native-type="submit"
              type="primary"
              size="large"
              :loading="signingIn"
              @click="signIn"
            >{{ signingIn === true ? '正在登錄' : '登錄' }}</el-button>
        </el-form>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        indexVisible: false,
        background: {
          num: 0,
          size: 4
        },
        backgroundVisible: true,
        togglingBackground: false,
        signInFormVisible: false,
        manager: {
          account: '',
          password: ''
        },
        signingIn: false
      }
    },
    computed: {
      backgroundStyle () {
        return {
          backgroundImage: `url(${require(`../assets/images/background-${this.background.num}.jpg`)})`
        }
      }
    },
    methods: {
      toggleBackgroundVisible () {
        this.backgroundVisible = !this.backgroundVisible
      },
      backgroundFadeIn () {
        if (this.background.num === this.background.size - 1) {
          this.background.num = 0
        } else {
          ++this.background.num
        }

        this.toggleBackgroundVisible()
      },
      toggleTogglingBackground () {
        this.togglingBackground = !this.togglingBackground
      },
      backgroundFadeOut () {
        this.toggleTogglingBackground()
        this.toggleBackgroundVisible()
      },
      signIn () {
        this.$refs.signInForm.validate(async (isValid) => {
          if (isValid === true) {
            this.signingIn = true

            const response = (await this.$ajax({
              method: 'post',
              url: '/admin/signIn',
              data: this.manager
            })).data

            this.$message({
              showClose: true,
              message: response.message,
              type: response.statusCode === 100 ? 'success' : 'error'
            })

            if (response.statusCode === 100) {
              localStorage.setItem('managerToken', response.result)
              this.$router.push('/manager')
            } else {
              this.signingIn = false
            }
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      let managerToken = localStorage.getItem('managerToken')

      if (managerToken) {
        if (managerToken !== '') {
          next('/manager')
        } else {
          next()
        }
      } else {
        localStorage.setItem('managerToken', '')
        next()
      }
    },
    created () {
      this.background.num = Math.floor(Math.random() * this.background.size)
      this.indexVisible = true
      this.signInFormVisible = true
    }
  }
</script>

<style lang="less">
  #index {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      z-index: -4;
    }

    .toggle-background {
      position: absolute;
      top: 24px;
      right: 32px;
    }

    .sign-in-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      background-color: rgba(255, 255, 255, .8);
      padding: 36px 0 48px;
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

  // 过渡效果及动画类
  .sign-in-form-slide-in-enter-active {
    transition: all .6s cubic-bezier(.5, 0, .5, 1);
  }

  .sign-in-form-slide-in-enter {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
  }
</style>
