// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置调用
Vue.prototype.$axios = axios

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})


axios.interceptors.request.use(conf => {
  if (conf.push === '/') {

  } else {
    if (localStorage.getItem('authentication')) {
      conf.headers.authentication = localStorage.getItem('authentication')
    }
  }
  return conf;
})


axios.interceptors.response.use(res => {
  return res;
}, error => {
  console.log('err', error)
  if ((error.response.status === 401 || error.response.status === 403)) {
    ElementUI.Message('用户登录失效、请重新登录!!!')
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
    return Promise.reject(error)
  }
  return error.response;
})
