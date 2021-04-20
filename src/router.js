import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import TestView from './views/TestView.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/testview',
      name: 'testview',
      component: TestView
    },

  ]
})

router.beforeEach((to, from, next) => {

    const pass = () => {}

    const loggedIn = sessionStorage.getItem('userData')
    if (to.name !== 'login' && loggedIn === null) pass()
    else next()
})

export default router