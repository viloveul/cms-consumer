const baseUrl = (typeof process.env.VILOVEUL_BASE_URL !== 'undefined') ? process.env.VILOVEUL_BASE_URL : __dirname

const apiUrl = (typeof process.env.VILOVEUL_API_URL !== 'undefined') ? process.env.VILOVEUL_API_URL : 'http://localhost:3333/api/v1'

const tokenHeader = (typeof process.env.VILOVEUL_TOKEN_HEADER !== 'undefined') ? process.env.VILOVEUL_TOKEN_HEADER : 'Bearer'

const dashboardUrl = (typeof process.env.VILOVEUL_DASHBOARD_URL !== 'undefined') ? process.env.VILOVEUL_DASHBOARD_URL : 'http://localhost:8085'

export default {
  getBaseUrl () {
    return (typeof window.viloveulBaseUrl !== 'undefined') ? window.viloveulBaseUrl : baseUrl
  },
  getApiUrl () {
    return (typeof window.viloveulApiUrl !== 'undefined') ? window.viloveulApiUrl : apiUrl
  },
  getTokenHeader () {
    return (typeof window.viloveulTokenHeader !== 'undefined') ? window.viloveulTokenHeader : tokenHeader
  },
  getDashboardUrl () {
    return (typeof window.viloveulDashboardUrl !== 'undefined') ? window.viloveulDashboardUrl : dashboardUrl
  }
}
