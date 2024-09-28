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
      // meta: { requiresAuth: true }
    },
    {
      path: '/query',
      name: 'query',
      // component: () => import('@/views/alarms/current/query.vue'),
      component: Query
      // meta: { requiresAuth: true }
    },
    {
      path: '/alarms',
      name: 'alarms',
      component: () => import('../views/alarms/View.vue'),
      children: [
        {
          path: '/current',
          name: 'current',
          component: () => import('../views/alarms/current/current.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/query',
          name: 'query',
          component: () => import('../views/alarms/query/query.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/manage',
          name: 'manage',
          component: () => import('../views/alarms/manage/manage.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

//路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem('userToken')) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath } // 重定向到登录页，并带上要跳转的页面
//       })
//     } else {
//       next() // 确保一定要调用next()
//     }
//   } else {
//     next() // 确保一定要调用next()
//   }
// })

// import { http } from '@/utils/http'
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()

// //分页
// router.beforeEach((to, from, next) => {
//   if (to.path === '/query') {
//     http
//       .post('/alarms/query/pages')
//       .then((res) => {
//         console.log('分页成功')
//         console.log(res)
//         const { total, current_page, url } = res.data
//         userStore.pageUser(total, current_page, url)
//         next()
//       })
//       .catch((error) => {
//         console.log(error) // 处理错误
//         next(error)
//       })
//   } else {
//     next()
//   }
// })

// //通道信息呈现
// router.beforeEach((to, from, next) => {
//   if (to.path === '/manage') {
//     var the_id: number = 1
//     for (; the_id <= 4; ) {
//       console.log('the_id=', the_id)
//       http
//         .post('/alarms/current/show', { the_id })
//         .then((res) => {
//           console.log(res)

//           next()
//         })
//         .catch((error) => {
//           // 处理错误
//           next(error)
//         })
//       the_id++
//     }
//   } else {
//     next()
//   }
// })

export default router
