import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/import/open_request',
    name: 'open_request',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/import/open_request.vue')
  },
  {
    path: '/import',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/import/index.vue')
  },
    {
    path: '/export',
    name: 'indexExport',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/export/index.vue')
  },
  {
    path: '/export/create_request',
    name: 'createExport',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/export/create_request.vue')
  },
    {
    path: '/export/check_weight',
    name: 'check_weight',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/export/check_weight.vue')
  },
  {
    path: '/barcode/export_barcode',
    name: 'indexBarcode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/barcode/index.vue')
  },
  {
    path: '/barcode/fill_truck/:id',
    name: 'Fill_truck',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/barcode/fill_truck.vue')
  },
  {
    path: '/export/car_exit/:id',
    name: 'car_exit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/export/car_exit.vue')
  },
]
const router = new VueRouter({
  mode: 'hash',
  base: '/' + process.env.VUE_APP_URL,
  routes
})

export default router
