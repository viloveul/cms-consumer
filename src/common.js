const apiUrl = process.env.VILOVEUL_API_URL !== undefined ? process.env.VILOVEUL_API_URL : 'http://localhost:19911'
const dashboardUrl = process.env.VILOVEUL_DASHBOARD_URL !== undefined ? process.env.VILOVEUL_DASHBOARD_URL : 'http://localhost:19912'

export default {
  getApiUrl () {
  	return window.VILOVEUL_API_URL !== undefined ? window.VILOVEUL_API_URL : apiUrl
  },
  getDashboardUrl () {
  	return window.VILOVEUL_DASHBOARD_URL !== undefined ? window.VILOVEUL_DASHBOARD_URL : dashboardUrl
  }
}