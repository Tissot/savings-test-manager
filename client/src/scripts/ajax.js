'use strict'

import Vue from 'vue'
import axios from 'axios'

const ajax = axios.create({
  headers: {
    'Content-Type': ''
  }
})

Vue.prototype.$ajax = ajax

export default ajax
