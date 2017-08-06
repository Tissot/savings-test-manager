'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/index'
import manager from '../views/manager'
import welcome from '../views/welcome'
import usersManagement from '../views/users-management'
import onlineContentLinksManagement from '../views/online-content-links-management'
import questionsManagement from '../views/questions-management'
import messagesManagement from '../views/messages-management'
import savingsSituation from '../views/savings-situation'
import integrationExchangeSituation from '../views/integration-exchange-situation'
import notFound from '../views/not-found'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: index }, {
      path: '/manager',
      component: manager,
      children: [
        { path: '/', component: welcome },
        { path: 'users-management', component: usersManagement },
        { path: 'online-content-links-management', component: onlineContentLinksManagement },
        { path: 'questions-management', component: questionsManagement },
        { path: 'messages-management', component: messagesManagement },
        { path: 'savings-situation', component: savingsSituation },
        { path: 'integration-exchange-situation', component: integrationExchangeSituation }
      ]
    },
    { path: '*', component: notFound }
  ]
})
