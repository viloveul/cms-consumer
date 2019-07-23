import http from '@/http'

const loadOptions = () => {
  return (dispatch) => {
    return http.get('/setting').then(res => {
      dispatch({
        type: 'LOADED_OPTIONS',
        payload: res.data.data
      })
    })
  }
}

const loadMenus = () => {
  return (dispatch) => {
    return http.get('/menu/load/navmenu').then(res => {
      dispatch({
        type: 'LOADED_MENUS',
        payload: res.data.data
      })
    })
  }
}

const loadWidgets = () => {
  return (dispatch) => {
    return http.get('/widget/load/sidebar').then(res => {
      dispatch({
        type: 'LOADED_WIDGETS',
        payload: res.data.data
      })
    })
  }
}

const initPagination = (payload) => {
  return {
    type: 'INIT_PAGINATION',
    payload: {
      page: payload.page || 1,
      size: payload.size || 10
    }
  }
}

export default {
  initPagination,
  loadOptions,
  loadMenus,
  loadWidgets
}
