import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter: (to, from, next) => {
        // this route requires unauth, check if logged out
        // if not, redirect to home page.
        store.dispatch('checkTokenValidity')
          .then(() => {
            next({ name: 'home' })
          })
          .catch(() => {
            next()
          })
      }
    },
    {
      path: '/products',
      component: () => import(/* webpackChunkName: "products" */ './views/Product/Product.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'products',
          component: () => import(/* webpackChunkName: "productsStart" */ './views/Product/Start.vue')
        },
        {
          path: 'insert',
          name: 'productsInsert',
          component: () => import(/* webpackChunkName: "productsInsert" */ './views/Product/Insert.vue')
        },
        {
          path: ':id/update',
          name: 'productsUpdate',
          component: () => import(/* webpackChunkName: "productsUpdate" */ './views/Product/Update.vue')
        },
        {
          path: ':id/delete',
          name: 'productsDelete',
          component: () => import(/* webpackChunkName: "productsDelete" */ './views/Product/Delete.vue')
        }
      ]
    },
    {
      path: '/categories',
      component: () => import(/* webpackChunkName: "categories" */ './views/Category/Category.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'categories',
          component: () => import(/* webpackChunkName: "categoriesStart" */ './views/Category/Start.vue')
        },
        {
          path: 'insert',
          name: 'categoriesInsert',
          component: () => import(/* webpackChunkName: "categoriesInsert" */ './views/Category/Insert.vue')
        },
        {
          path: ':id/update',
          name: 'categoriesUpdate',
          component: () => import(/* webpackChunkName: "categoriesUpdate" */ './views/Category/Update.vue')
        },
        {
          path: ':id/delete',
          name: 'categoriesDelete',
          component: () => import(/* webpackChunkName: "categoriesDelete" */ './views/Category/Delete.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.dispatch('checkTokenValidity')
      .then(() => {
        next()
      })
      .catch(() => {
        next({ name: 'login' })
      })
  } else {
    next()
  }
})

export default router
