export default {
  getContainerClasses: (state) => () => {
    return state.containerClasses
  },
  getShowNavbar: (state) => () => {
    return state.showNavbar
  },
  getOption: (state) => (name, $default = null) => {
    if (typeof state.options[name] === 'string' && state.options[name].length > 0) {
      return state.options[name]
    }
    return (typeof state.options[name] !== 'undefined' && state.options[name] !== null) ? state.options[name] : $default
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
  getWidget: (context) => (type = 'sidebar') => {
    if (context.widgets[type] !== undefined) {
      return context.widgets[type]
    } else {
      return []
    }
  },
  isFormatPost: (context) => (post) => {
    for (let i = 0; i < context.options.contents.posts.length; i++) {
      if (context.options.contents.posts[i].name === post.type && context.options.contents.posts[i].format === 'post') {
        return true
      }
    }
    return false
  }
}
