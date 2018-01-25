import request from '@/utils/request'
import qs from 'qs'


export function login(username, password) {
  // var params = new URLSearchParams()
  // params.append('authKey', username)
  // params.append('authPass', password)
  var params = {
    'authKey': username,
    'authPass': password
  }

  return request({
    url: '/auth/get',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
