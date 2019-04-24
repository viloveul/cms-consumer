import initial from '@/common/initial'

export default {
  setShowNavbar: async (state, payload) => {
    state.showNavbar = payload
  },
  setOption: async (state, payload) => {
    for (let i in payload) {
      if (payload[i] !== null) {
        if (typeof payload[i] !== 'string') {
          state.options[i] = payload[i]
        } else if (payload[i].length > 0) {
          state.options[i] = payload[i]
        }
      }
    }
  },
  setWidget: async (state, payload) => {
    for (let i in payload) {
      if (payload[i] !== null) {
        state.widgets[i] = payload[i]
      }
    }
  },
  setToken: async (state, payload) => {
    state.token = payload
  },
  setMe: async (state, me) => {
    state.me = await Object.assign({}, initial.me, me)
  },
  setPrivileges: async (state, privileges) => {
    state.privileges = privileges
  },
  setBreadcrumbs: async (context, items) => {
    context.breadcrumbs = [...items]
  },
  setErrors: async (context, errors) => {
    for (let i = 0; i < errors.length; i++) {
      await context.errors.push(errors[i])
    }
  },
  setRedirection: async (context, path) => {
    context.redirect = path
  }
}
