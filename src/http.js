import Axios from 'axios'
import common from '@/common'

export default Axios.create({
  baseURL: common.getApiUrl(),
  transformRequest: (data, headers) => {
    let token = window.localStorage.getItem('viloveul:token') || null
    if (token !== null) {
      headers['Authorization'] = 'Bearer ' + token
    }
    return data
  }
})
