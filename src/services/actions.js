import qs from 'qs'
import http from '@/common/http'
import config from '@/common/config'
import initial from '@/common/initial'

export default {
  resetErrors: async (context, payload) => {
    context.state.errors = []
  },
  resetMe: async (context, payload) => {
    await window.localStorage.removeItem('vtoken')
    await context.commit('setMe', {...initial.me})
    await context.commit('setPrivileges', [])
  },
  updateTitle: async (context, content) => {
    let val = content === null ? context.getters.getOption('description') : content
    window.document.title = context.getters.getOption('brand') + ' : ' + val
  },
  updateDescription: async (context, content) => {
    let metas = window.document.querySelectorAll('[viloveul-controlled-description]')
    for (let i = 0; i < metas.length; i++) {
      metas[i].parentNode.removeChild(metas[i])
    }
    let val = content === null ? context.getters.getOption('description') : content

    let description = document.createElement('meta')
    description.setAttribute('name', 'description')
    description.setAttribute('content', val)
    description.setAttribute('viloveul-controlled-description', '')
    window.document.head.appendChild(description)

    let ogdescription = document.createElement('meta')
    ogdescription.setAttribute('property', 'og:description')
    ogdescription.setAttribute('content', val)
    ogdescription.setAttribute('viloveul-controlled-description', '')
    window.document.head.appendChild(ogdescription)
  },
  channel: async (context, payload) => {
    try {
      let origin = payload.origin
      let cmd = payload.cmd
      let target = origin + '/proxy.html'
      let el = window.document.querySelector('[src="' + target + '"]')
      let proxy = await new Promise((resolve, reject) => {
        if (el === null) {
          el = window.document.createElement('iframe', {})
          el.src = target
          el.style.width = '0px'
          el.style.height = '0px'
          el.style.position = 'absolute'
          el.style.left = '-9999px'
          el.style.border = 'None'
          el.style.top = '-9999px'
          el.style.visibility = 'hidden'
          el.addEventListener('load', () => {
            resolve(el)
          })
          window.document.body.appendChild(el)
        } else {
          resolve(el)
        }
      })
      proxy.contentWindow.postMessage({cmd}, origin)
    } catch (e) {
      // do nothing
    }
  },
  clearToken: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    return new Promise((resolve, reject) => {
      context.dispatch('channel', {origin: dashboardUrl, cmd: 'viloveul.clear'})
      let windowListener = async (event) => {
        if (event.origin === dashboardUrl) {
          await context.dispatch('resetMe')
          window.removeEventListener('message', windowListener, true)
          resolve(null)
        }
      }
      window.addEventListener('message', windowListener, true)
    })
  },
  readToken: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let token = window.localStorage.getItem('vtoken') || null
    return new Promise((resolve, reject) => {
      if (token === null) {
        context.dispatch('channel', {origin: dashboardUrl, cmd: 'viloveul.read'})
        let windowListener = (event) => {
          if (event.origin === dashboardUrl) {
            if (event.data.status === 'success' && event.data.value !== undefined) {
              window.localStorage.setItem('vtoken', event.data.value)
              resolve(event.data.value)
            } else {
              resolve(null)
            }
            window.removeEventListener('message', windowListener, true)
          }
        }
        window.addEventListener('message', windowListener, true)
      } else {
        resolve(token)
      }
    })
  },
  fetchMe: async (context, payload) => {
    let token = await context.dispatch('readToken')
    if (token === 'null' || token === null) {
      await context.dispatch('resetMe')
    } else {
      await http.get('/user/me').then(res => {
        context.commit('setMe', res.data.data)
        context.commit('setPrivileges', res.data.meta.privileges)
      }).catch(async (e) => {
        await context.dispatch('resetMe')
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
    let res = await http.get('/blog/index', {
      params: payload.params
    })
    return res.data
  },
  fetchArchivePosts: async (context, payload) => {
    let res = await http.get('/blog/archive/' + payload.name, {
      params: payload.params || {}
    })
    return res.data
  },
  fetchAuthorPosts: async (context, payload) => {
    let res = await http.get('/blog/author/' + payload.name, {
      params: payload.params || {}
    })
    return res.data
  },
  fetchPostDetail: async (context, payload) => {
    let res = await http.get('/blog/detail/' + payload.slug, {
      params: payload.params || {}
    })
    return res.data
  },
  fetchPostComments: async (context, payload) => {
    let res = await http.get('/blog/comments/' + payload.id, {
      params: payload.params || {}
    })
    return res.data
  },
  sendComment: async (context, payload) => {
    let res = await http.post('/comment/create', qs.stringify(payload || {}))
    return res.data
  }
}
