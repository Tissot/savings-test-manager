'use strict'

import Vue from 'vue'

import {
  button,
  dialog,
  form,
  formItem,
  input,
  menu,
  menuItem,
  message,
  radio,
  radioGroup,
  select,
  submenu,
  table,
  tableColumn,
  tabPane,
  tabs,
  option
} from 'element-ui'

Vue.use(button)
Vue.use(dialog)
Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(menu)
Vue.use(menuItem)
Vue.use(radio)
Vue.use(radioGroup)
Vue.use(select)
Vue.use(submenu)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(tabPane)
Vue.use(tabs)
Vue.use(option)

Vue.prototype.$message = message

import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'

locale.use(lang)
