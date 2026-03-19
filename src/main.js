// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 设置cookie，session跨域设置
axios.defaults.withCredentials = true;
// 设置POST请求体，请求格式为json
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 设置全局axios写法
Vue.prototype.$http = axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
// 导航路由函数
//to : 跳转的路由对象
//from : 当前的路由对象
//next : 跳转函数，定义跳转地址

router.beforeEach((to, from, next) => {
  // 判断本地存储中是否有user_id
  const user_id = localStorage.getItem('user_id')
  console.log("进入到导航路由")
  if (to.meta.requireAuth==true){
    if (user_id) {
      // 允许访问
      console.log("已登录")
      next()
    } else {
      // 回到登录页
      console.log("未登录")
      next("/")
    }
  } else {
    // 允许访问
    console.log("不用登录")
    next()
  }

})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
