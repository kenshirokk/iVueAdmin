import request from '@/utils/request'
import qs from 'qs'

export function getList(pageNum, pageSize,agencyId,agencyNickname) {
  return request({
    url: '/enchashment?pageNum=' + pageNum + '&pageSize=' + pageSize + '&agencyId=' + agencyId + '&agencyNickname=' + agencyNickname,
    method: 'GET'
  })
}

export function updateStatus(params) {
  return request({
    url: '/enchashment/update',
    method: 'POST',
    data: qs.stringify(params)
  })
}


export function save(params) {
  return request({
    url: '/enchashment/save',
    method: 'POST',
    data: qs.stringify(params)
  })
}
