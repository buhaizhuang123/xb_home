import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login'

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
      path: '/homePage',
      name: 'homePage',
      component: () => import('../view/homePage/index'),
      meta: {
        title: '首页'
      }
    }
  ]
})
