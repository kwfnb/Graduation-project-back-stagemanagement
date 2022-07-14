/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 10:43:55
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-11 15:06:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
      {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
        {
    path: '/adminAccount',
    name: 'adminAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/accountManagement/adminAccount.vue')
  },
  {
    path: '/userAccount',
    name: 'userAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/accountManagement/userAccount.vue')
  },
  {
    path: '/systemMessage',
    name: 'systemMessage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dataManagement/systemMessage.vue')
  }
  ,
  {
    path: '/dynamic',
    name: 'dynamic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dataManagement/dynamic.vue')
  }
  ,
  {
    path: '/report',
    name: 'report',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dataManagement/report.vue')
  }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next)=>{
    let isLogin = localStorage.getItem("isLogin")
    if(isLogin){
        if (to.name=="Home") {
            next('/adminAccount');
        }else{
            next();
        }
    
  }else{
    next("/login");
  }    
})

export default router
