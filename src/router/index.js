import Vue from 'vue'
import Router from 'vue-router'
import test01 from '@/components/demo/test01'
import test02 from '@/components/demo/test02'
import test03 from '@/components/demo/test03'
import login from '@/components/page/Login'
import home from '@/components/page/Home'
import chat from '@/components/page/Chat'
import image from '@/components/page/Image'
import knowledge from '@/components/page/Knowledge'
import product from '@/components/page/Product'
import notfound from "@/components/page/Page404"


Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉浏览器地址栏的#号
  routes: [
    {
      path: '/', //登录页面，path用于浏览器访问的路径 或者 跳转this.$router.push('/')
      name: 'login', // 路由名称，用于代码中通过 name 方式跳转和识别路由 this.$router.push({ name: 'login' })
      component: login
    },
    {
      path: '/home', //主页面
      name: 'home',
      component: home
    },
    {
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/chat', //chat页面
      name: 'chat',
      meta: {
        requireAuth: true // 需要登录才能访问
      },
      component: chat
    },
    {
      path: '/image',
      name: 'image',
      component: image
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: knowledge
    },
    {
      path: '/test02',
      name: 'test02',
      component: test02
    },
    {
      path: '/test03',
      name: 'test03',
      component: test03
    },
    {
      path: '*', // * 匹配所有路由
      name: 'Page404', // name表示的是路由的name
      component: notfound
    }
  ]
})
