import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import Current from '../views/alarms/current/current.vue'
import Query from '../views/alarms/query/query.vue'
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
      component: Current
    },
    {
      path: '/query',
      name: 'query',
      // component: () => import('@/views/alarms/current/query.vue'),
      component: Query
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
          component: () => import('../views/alarms/query/query.vue')
        },
        {
          path: '/manage',
          name: 'manage',
          component: () => import('../views/alarms/manage/manage.vue')
        }
      ]
    }
  ]
})

import { http } from '@/utils/http'

router.beforeEach((to, from, next) => {
  if (to.path === '/query') {
    http
      .post('/alarms/query/pages')
      .then((res) => {
        console.log('分页成功')
        console.log(res)
        next()
      })
      .catch((error) => {
        // 处理错误
        next(error)
      })
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/manage') {
//     http
//       .post('/alarms/current/show')
//       .then((res) => {
//         console.log(res)
//         next()
//       })
//       .catch((error) => {
//         // 处理错误
//         next(error)
//       })
//   } else {
//     next()
//   }
// })

export default router
