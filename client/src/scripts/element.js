'use strict'

import Vue from 'vue'

import {
  button,
  form,
  formItem,
  input,
  menu,
  menuItem,
  message,
  select,
  submenu,
  table,
  tableColumn,
  tabPane,
  tabs,
  option
} from 'element-ui'

Vue.use(button)
Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(menu)
Vue.use(menuItem)
Vue.use(select)
Vue.use(submenu)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(tabPane)
Vue.use(tabs)
Vue.use(option)

Vue.prototype.$message = message
