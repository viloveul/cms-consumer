// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NProgress from 'nprogress'
import store from '@/store'
import router from '@/router'
import http from '@/common/http'
import App from '@/App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'nprogress/nprogress.css'
import '@/assets/style.css'
import '@/assets/viloveul.css'

Vue.config.productionTip = false

NProgress.configure({
  trickle: false
})

http.interceptors.request.use(config => {
  NProgress.start()
  return config
})

http.interceptors.response.use(
  res => {
    NProgress.done()
    return res
  },
  err => {
    if (err.response.status !== 404) {
      let errors = err.response.data.errors.map(e => {
        return e.detail
      })
      store.commit('setErrors', errors)
    }
    NProgress.done()
    return Promise.reject(err)
  }
)

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    await store.dispatch('resetErrors')
    await store.dispatch('resetContainerClasses')
    await store.commit('setBreadcrumbs', [])
    await store.dispatch('updateTitle', null)
    await store.dispatch('updateDescription', null)
    await store.commit('setShowNavbar', true)
  }
  await store.commit('setRedirection', from.path)
  return next()
})

router.beforeResolve((to, from, next) => {
  NProgress.start()
  return next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#viloveul-app',
  store,
  router,
  components: { App },
  template: '<App />'
})
