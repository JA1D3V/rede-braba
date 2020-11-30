import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Feed.vue')
  },
  {
    path: '/fpwd',
    name: 'Forgot-Password',
    component: () => import('../views/Fpwd.vue')
  },
  {
    path: '/rpassword',
    name: 'Reset-password',
    component: () => import('../views/rpassword')
  },
  {
    path: '/new_post',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
