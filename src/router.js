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
      component: Home
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
          .then(jwt => {
            console.log(jwt)
            next({ name: 'home' })
          })
          .catch(error => {
            console.log(error)
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.dispatch('checkTokenValidity')
      .then(jwt => {
        console.log(jwt)
        next()
      })
      .catch(error => {
        console.log(error)
        next({ name: 'login' })
      })
  } else {
    next()
  }
})

export default router
