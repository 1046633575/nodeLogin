import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Msg from '../views/msg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {isLogin: true}
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {isLogin: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {isLogin: true}
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/msg',
    name: 'msg',
    component: Msg
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isLogin && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
