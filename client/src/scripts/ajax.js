'use strict'

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://mardan.top'

const ajax = axios.create()

Vue.prototype.$ajax = ajax

export default ajax
