import qs from 'qs'
import http from '@/common/http'
import config from '@/common/config'
import initial from '@/common/initial'

export default {
  resetContainerClasses: async (context, payload) => {
    context.state.containerClasses = initial.containerClasses
  },
  resetErrors: async (context, payload) => {
    context.state.errors = []
  },
  resetMe: async (context, payload) => {
    await window.localStorage.clear()
    await context.commit('setMe', {
      ...initial.me
    })
    await context.commit('setPrivileges', [])
  },
  syncFeatures: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let iframe = window.document.createElement('iframe', {})
    iframe.src = dashboardUrl + '/proxy.html'
    iframe.style.width = '0px'
    iframe.style.height = '0px'
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    let iframeListener = (event) => {
      iframe.contentWindow.postMessage('{"features:widget:types": ["sidebar"]}', dashboardUrl)
      iframe.removeEventListener('load', iframeListener, true)
    }
    let windowListener = (event) => {
      if (event.origin === dashboardUrl) {
        window.removeEventListener('message', windowListener, true)
        iframe.remove()
      }
    }
    iframe.addEventListener('load', iframeListener, true)
    window.addEventListener('message', windowListener, true)
    window.document.body.appendChild(iframe)
  },
  clearToken: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let iframe = window.document.createElement('iframe', {})
    iframe.src = dashboardUrl + '/proxy.html'
    iframe.style.width = '0px'
    iframe.style.height = '0px'
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    let iframeListener = (event) => {
      iframe.contentWindow.postMessage('viloveul.clear', dashboardUrl)
      iframe.removeEventListener('load', iframeListener, true)
    }
    let windowListener = (event) => {
      if (event.origin === dashboardUrl) {
        window.removeEventListener('message', windowListener, true)
        iframe.remove()
      }
    }
    iframe.addEventListener('load', iframeListener, true)
    window.addEventListener('message', windowListener, true)
    window.document.body.appendChild(iframe)
    await context.dispatch('resetMe')
  },
  readToken: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let token = window.localStorage.getItem('vtoken') || null
    return new Promise((resolve, reject) => {
      if (token === null) {
        let iframe = window.document.createElement('iframe', {})
        iframe.src = dashboardUrl + '/proxy.html'
        iframe.style.width = '0px'
        iframe.style.height = '0px'
        iframe.style.position = 'absolute'
        iframe.style.left = '-9999px'
        iframe.style.top = '-9999px'
        let iframeListener = (event) => {
          iframe.contentWindow.postMessage('viloveul.token', dashboardUrl)
          iframe.removeEventListener('load', iframeListener, true)
        }
        let windowListener = (event) => {
          if (event.origin === dashboardUrl) {
            if (event.data !== 'e') {
              window.localStorage.setItem('vtoken', event.data)
              resolve(event.data)
            } else {
              resolve(null)
            }
            window.removeEventListener('message', windowListener, true)
            iframe.remove()
          }
        }
        iframe.addEventListener('load', iframeListener, true)
        window.addEventListener('message', windowListener, true)
        window.document.body.appendChild(iframe)
      } else {
        resolve(token)
      }
    })
  },
  fetchMe: async (context, payload) => {
    let token = await context.dispatch('readToken')
    if (token === 'null') {
      await context.dispatch('resetMe')
    } else if (token !== null) {
      await http.get('/user/me').then(res => {
        context.commit('setMe', res.data.data.attributes)
        context.commit('setPrivileges', res.data.meta.privileges)
      }).catch(async (e) => {
        await context.dispatch('clearToken')
      })
    }
  },
  fetchWidget: async ({commit}, payload) => {
    let res = await http.get('/widget/load/' + payload.type)
    await commit('setWidget', {
      [payload.type]: res.data.data
    })
    return res.data.data
  },
  fetchOption: async ({ commit }, payload) => {
    let res = await http.get('/setting/' + payload.name)
    await commit('setOption', {
      [payload.name]: res.data.data.option
    })
    return res.data.data.option
  },
  fetchBlogPosts: async (context, payload) => {
    let res = await http.get('/blog/index', payload.params)
    return res.data
  },
  fetchArchivePosts: async (context, payload) => {
    let res = await http.get('/blog/archive/' + payload.name, payload.params || {})
    return res.data
  },
  fetchAuthorPosts: async (context, payload) => {
    let res = await http.get('/blog/author/' + payload.name, payload.params || {})
    return res.data
  },
  fetchPostDetail: async (context, payload) => {
    let res = await http.get('/blog/detail/' + payload.slug, payload.params || {})
    return res.data
  },
  fetchPostComments: async (context, payload) => {
    let res = await http.get('/blog/comments/' + payload.id, payload.params || {})
    return res.data
  },
  sendComment: async (context, payload) => {
    let res = await http.post('/blog/comment/' + payload.id, qs.stringify(payload.params || {}))
    return res.data
  }
}
