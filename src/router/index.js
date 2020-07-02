import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/linkview',
    name: 'linkview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Linkview.vue')
  },
  {
    path: '/experiencesharing',
    name: 'experiencesharing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ExperienceSharing.vue')
  },
  {
    path: '/articlecontent',
    name: 'articlecontent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleContent.vue')
    // beforeEnter: (to, from, next) => {
    //   if (from.name === 'experiencesharing') {
    //     next()
    //   } else {
    //     next('/experiencesharing')
    //   }
    // }
  },
  {
    path: '/editor',
    name: 'editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Editor.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/manager',
    name: 'manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manager.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// to:即将前往的页面,from:从哪个页面来,next:下一步操作
router.beforeEach((to, from, next) => {
  // console.log(from)
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('ext')) {
      //  通过封装好的读取，如果存在，name接下一步如果不存在，那跳转回登录页
      next() // 不要在next里面加"path:/",会陷入死循环
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
