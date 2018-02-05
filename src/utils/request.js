import axios from 'axios'
import $ons from 'vue-onsenui/esm'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  config.withCredentials = true
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      $ons.notification.toast(res.message, {timeout: 2000})
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    $ons.notification.toast(error.message, {timeout: 2000})
    return Promise.reject(error)
  }
)

export default service
