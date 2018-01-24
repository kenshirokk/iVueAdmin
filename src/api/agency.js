import request from '@/utils/request'
import qs from 'qs'

export function getMyList() {
  return request({
    url: '/agency',
    method: 'GET'
  })
}

export function getPersonalInfo() {
  return request({
    url: '/agency/personalInfo',
    method: 'GET'
  })
}

export function getList(pageNum, pageSize,agencyId,parentId,nickname) {
  return request({
    url: '/agency?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&agencyId=' + agencyId+ '&parentId=' + parentId+ '&nickname=' + nickname,
    method: 'GET'
  })
}

export function updateRoomCard(params) {
  return request({
    url: '/agency/updateRoomCard',
    method: 'POST',
    data: qs.stringify(params)
  })
}
export function updateCoin(params) {
  return request({
    url: '/agency/updateCoin',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function updateSpreader(params) {
  return request({
    url: '/agency/updateSpreader',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function del(params) {
  return request({
    url: '/agency/delete',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function disabled(params) {
  return request({
    url: '/agency/toggleDisable',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function getByUserId(id) {
  return request({
    url: '/agency/findByUserId/'+id,
    method: 'GET'
  })
}

export function create(params) {
  return request({
    url: '/agency/save/',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function updatePwd(params) {
  return request({
    url: '/agency/updatePassword/',
    method: 'POST',
    data: qs.stringify(params)
  })
}
