import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/common/config'

import Viloveul from '@/pages/Viloveul'
import Blog from '@/pages/Blog'
import Archive from '@/pages/Archive'
import Author from '@/pages/Author'
import Singular from '@/pages/Singular'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Viloveul
  },
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/:year(\\d+)',
    component: Blog
  },
  {
    path: '/:year(\\d+)/:month(\\d+)',
    component: Blog
  },
  {
    path: '/:year(\\d+)/:month(\\d+)/:day(\\d+)',
    component: Blog
  },
  {
    path: '/:type/:slug',
    component: Archive
  },
  {
    path: '/@:name',
    component: Author
  },
  {
    path: '/*',
    component: Singular
  }
]

const router = new VueRouter({
  mode: 'history',
  base: config.getBaseUrl(),
  routes: routes
})

export default router
