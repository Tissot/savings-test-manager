'use strict'

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://mardan.top'

Vue.prototype.$ajax = axios

export default axios
