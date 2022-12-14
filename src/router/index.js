import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  // =========主页========================================================================
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/home",
    children: [//子路由
      // ============主页================
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/HomeView.vue')
      },
      // ========= User ==================
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/user/User.vue')
      }, {
        path: 'addUser',
        name: 'AddUser',
        component: () => import('@/views/user/AddUser.vue')
      }, {
        path: 'editUser',
        name: 'EditUser',
        component: () => import('@/views/user/EditUser.vue')
      },
      // ========== Admin ===============
      {
        path: 'adminList',
        name: 'AdminList',
        component: () => import('@/views/admin/List.vue')
      }, {
        path: 'addAdmin',
        name: 'AddAdmin',
        component: () => import('@/views/admin/Add.vue')
      }, {
        path: 'editAdmin',
        name: 'EditAdmin',
        component: () => import('@/views/admin/Edit.vue')
      },

      // ========== Category ===============
      {
        path: 'categoryList',
        name: 'CategoryList',
        component: () => import('@/views/category/List.vue')
      }, {
        path: 'addCategory',
        name: 'AddCategory',
        component: () => import('@/views/category/Add.vue')
      }, {
        path: 'editCategory',
        name: 'EditCategory',
        component: () => import('@/views/category/Edit.vue')
      },



      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }

    ]
  },

  // ============  404  ======================
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  const admin = localStorage.getItem("admin")
  if (!admin && to.path !== '/login') {
    return next("/login")
  }
  next()
})



export default router
