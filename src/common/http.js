import Axios from 'axios'
import config from '@/common/config'

export default Axios.create({
  baseURL: config.getApiUrl(),
  transformRequest: (data, headers) => {
    let tokenHeader = config.getTokenHeader() || 'Bearer'
    let token = window.localStorage.getItem('viloveul:token') || null
    headers['Authorization'] = tokenHeader + ' ' + token
    return data
  }
})
