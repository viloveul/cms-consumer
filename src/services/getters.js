export default {
  getShowNavbar: (state) => () => {
    return state.showNavbar
  },
  getMenus: (state) => () => {
    return state.menus
  },
  getOptions: (state) => () => {
    return state.options
  },
  getToken: (state) => () => {
    return state.token
  },
  getMe: (state) => () => {
    return state.me
  },
  getPrivileges: (state) => () => {
    return state.privileges
  },
  getBreadcrumbs: (context) => () => {
    return context.breadcrumbs
  },
  getErrors: (context) => () => {
    return context.errors
  },
  getTitle: (context) => () => {
    return window.document.title
  },
  getRedirect: (context) => () => {
    return context.redirect
  },
  getWidgets: (context) => () => {
    return context.widgets
  }
}
