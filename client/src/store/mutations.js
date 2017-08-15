'use strict'

import axios from 'axios'

export default {
  setManagerToken (state, managerToken) {
    state.manager.token = managerToken
    axios.defaults.headers.common['token'] = managerToken
  }
}
