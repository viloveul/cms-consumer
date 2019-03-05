import qs from 'qs'
import http from '@/common/http'
import config from '@/common/config'
import initial from '@/common/initial'

let getChannel = async (identity, src) => {
  return new Promise((resolve, reject) => {
    let k = 'viloveul-' + identity + '-channel'
    let iframe = window.document.getElementById(k)
    if (iframe === null) {
      iframe = window.document.createElement('iframe', {})
      iframe.id = k
      iframe.src = src
      iframe.style.width = '0px'
      iframe.style.height = '0px'
      iframe.style.position = 'absolute'
      iframe.style.left = '-9999px'
      iframe.style.top = '-9999px'
      iframe.style.visibility = 'hidden'
      iframe.addEventListener('load', () => {
        try {
          resolve(iframe.contentWindow)
        } catch (e) {
          resolve(iframe.contentWindow)
        }
      })
      window.document.body.appendChild(iframe)
    } else {
      resolve(iframe.contentWindow)
    }
  })
}

export default {
  resetContainerClasses: async (context, payload) => {
    context.state.containerClasses = initial.containerClasses
  },
  resetErrors: async (context, payload) => {
    context.state.errors = []
  },
  resetMe: async (context, payload) => {
    await window.localStorage.removeItem('vtoken')
    await context.commit('setMe', {
      ...initial.me
    })
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
  syncFeatures: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let channel = await getChannel('dashboard', dashboardUrl + '/proxy.html')
    return new Promise((resolve, reject) => {
      let features = [
        {
          key: 'widget',
          value: {
            types: ['sidebar']
          }
        },
        {
          key: 'banner',
          value: {
            width: 960,
            height: 200
          }
        }
      ]
      channel.postMessage({cmd: 'viloveul.sync', params: features}, dashboardUrl)
      let windowListener = (event) => {
        if (event.origin === dashboardUrl) {
          window.removeEventListener('message', windowListener, true)
          resolve(null)
        }
      }
      window.addEventListener('message', windowListener, true)
    })
  },
  clearToken: async (context, payload) => {
    let dashboardUrl = config.getDashboardUrl()
    let channel = await getChannel('dashboard', dashboardUrl + '/proxy.html')
    return new Promise((resolve, reject) => {
      channel.postMessage({cmd: 'viloveul.delete', params: ['vtoken']}, dashboardUrl)
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
    let channel = await getChannel('dashboard', dashboardUrl + '/proxy.html')
    let token = window.localStorage.getItem('vtoken') || null
    return new Promise((resolve, reject) => {
      if (token === null) {
        channel.postMessage({cmd: 'viloveul.fetch', params: ['vtoken']}, dashboardUrl)
        let windowListener = (event) => {
          if (event.origin === dashboardUrl) {
            if (event.data.status === 'success' && event.data.params.vtoken !== undefined) {
              window.localStorage.setItem('vtoken', event.data.params.vtoken)
              resolve(event.data.params.vtoken)
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
        context.commit('setMe', res.data.data.attributes)
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
    let res = await http.post('/blog/comment/' + payload.id, qs.stringify(payload.params || {}))
    return res.data
  }
}
