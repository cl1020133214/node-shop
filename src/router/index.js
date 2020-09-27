import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GoodsList',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsList.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
