import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import Current from '../views/alarms/current/current.vue'
import Query from '../views/alarms/current/query.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'selectAccount',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/current',
      name: 'current',
      // component: () => import('@/views/alarms/current/current.vue'),
      component:Current
    },
    {
      path: '/query',
      name: 'query',
      // component: () => import('@/views/alarms/current/query.vue'),
      component:Query
    },
        {
      path: '/alarms',
      name: 'alarms',
      component: () => import('../views/alarms/View.vue'),
      children: [
        {
          path: '/current',
          name: 'current',
          component: () => import('../views/alarms/current/current.vue')
        },
        {
          path: '/query',
          name: 'query',
          component: () => import('../views/alarms/current/query.vue')
        },
        {
          path: '/manage',
          name: 'manage',
          component: () => import('../views/alarms/current/manage.vue')
        },
      ]
    },
  ]
})

export default router
