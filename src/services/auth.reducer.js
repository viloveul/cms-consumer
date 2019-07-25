import initial from '@/services/auth.initial'

export default (state = initial, action) => {
  switch (action.type) {
    case 'AUTH_READ_TOKEN_SUCCESS':
      window.localStorage.setItem('viloveul:token', action.payload.token)
      return {
        ...state,
        ...action.payload
      }
    case 'AUTH_READ_TOKEN_FAILED':
      return {
        ...state,
        ...action.payload
      }
    case 'AUTH_FETCH_USER_LOGIN_SUCCESS':
      return {
        ...state,
        ...initial,
        ...action.payload
      }
    case 'AUTH_FETCH_USER_LOGIN_FAILED':
      return {
        ...state,
        ...initial
      }
    case 'AUTH_CLEAR_TOKEN':
      window.localStorage.removeItem('viloveul:token')
      return {
        ...state,
        token: ''
      }
    default:
      return {...state}
  }
}
