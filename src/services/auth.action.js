import channel from '@/channel'
import common from '@/common'
import http from '@/http'

const readToken = () => {
  return (dispatch) => {
    let token = window.localStorage.getItem('viloveul:token') || null
    let req = new Promise((resolve, reject) => {
      if (token === null) {
        channel({
          url: common.getDashboardUrl(),
          cmd: 'viloveul.read'
        })
        let windowListener = (event) => {
          if (event.origin === common.getDashboardUrl()) {
            if (event.data.status === 'success' && event.data.value !== undefined) {
              window.localStorage.setItem('viloveul:token', event.data.value)
              resolve(event.data.value)
            } else {
              reject('oops')
            }
            window.removeEventListener('message', windowListener, true)
          }
        }
        window.addEventListener('message', windowListener, true)
      } else {
        resolve(token)
      }
    })
    req.then(tkn => {
      dispatch(readTokenSuccess(tkn))
    })
    req.catch(e => {
      dispatch(readTokenFailed())
    })
    return req
  }
}

const readTokenSuccess = (token) => {
  return {
    type: 'AUTH_READ_TOKEN_SUCCESS',
    payload: {
      token: token
    }
  }
}

const readTokenFailed = () => {
  return {
    type: 'AUTH_READ_TOKEN_FAILED',
    payload: {
      token: null
    }
  }
}

const fetchUserLogin = () => {
  return (dispatch) => {
    return http.get('/user/me').then(res => {
      dispatch(fetchUserLoginSuccess(res.data))
    }).catch(err => {
      window.localStorage.removeItem('viloveul:token')
      dispatch(fetchUserLoginFailed())
    })
  }
}

const fetchUserLoginSuccess = (data) => {
  return {
    type: 'AUTH_FETCH_USER_LOGIN_SUCCESS',
    payload: {
      user: data.data,
      privileges: data.meta.privileges
    }
  }
}

const fetchUserLoginFailed = () => {
  return {
    type: 'AUTH_FETCH_USER_LOGIN_FAILED',
    payload: {}
  }
}

export default {
  readToken,
  readTokenSuccess,
  readTokenFailed,
  fetchUserLogin,
  fetchUserLoginSuccess,
  fetchUserLoginFailed
}