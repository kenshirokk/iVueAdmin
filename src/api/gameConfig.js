import request from '@/utils/request'
import qs from 'qs'

export function getList(pageNum, pageSize) {
  return request({
    url: '/gameConfig',
    method: 'GET'
  })
}

export function update(params) {
  return request({
    url: '/gameConfig/update',
    method: 'POST',
    data: qs.stringify(params)
  })
}
