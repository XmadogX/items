import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: '/history/add-on',
    name: 'add-on history',
    component: () => import('../views/History.vue')
  },
  {
    path: '/history/delete',
    name: 'delete history',
    component: () => import('../views/History.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
