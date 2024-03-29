import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'default',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: () => import('../views/homePage/index'),
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/userList',
          name: 'userList',
          component: () => import('@/views/user/userList'),
          meta: {
            title: '用户信息'
          }
        },
        {
          path: '/default',
          name: 'default',
          component: () => import('@/views/page/default')
        }
      ]
    },

  ]
})
