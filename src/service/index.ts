import axios from 'axios'
import { message } from 'antd'

// axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '' : 'http://10.0.10.207:7001'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (res.data.code != 200) {
    if (res.data.msg) {
      message.error(res.data.msg)
    }
    // if (res.data.code == 401) {
    //   window.location.href = '/login'
    // }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios