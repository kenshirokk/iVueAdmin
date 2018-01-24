import request from '@/utils/request'
import qs from 'qs'

export function getList(pageNum, pageSize) {
  return request({
    url: '/shopInfo?pageNum=' + pageNum + '&pageSize' + pageSize,
    method: 'GET'
  })
}

export function update(params) {
  return request({
    url: '/shopInfo',
    method: 'POST',
    data: qs.stringify(params)
  })
}
