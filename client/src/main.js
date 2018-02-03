'use strict'

// 浏览器样式标准化
import './assets/styles/normalize.less'

// 按需引入组件
import './scripts/element'

// 引入ajax
import './scripts/ajax'

// 引入 Vue 相关库
import Vue from 'vue'
import App from './App'
import router from './scripts/router'

// 引入样式覆盖
import './assets/styles/element-ui-cover.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
