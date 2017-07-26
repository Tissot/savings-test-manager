'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/index'
import manager from '../views/manager'
import notFound from '../views/not-found'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: index },
    { path: '/manager', component: manager },
    { path: '*', component: notFound }
  ]
})
