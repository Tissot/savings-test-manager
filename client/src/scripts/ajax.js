'use strict'

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://112.74.59.5:3000'

const ajax = axios.create()

Vue.prototype.$ajax = ajax

export default ajax
