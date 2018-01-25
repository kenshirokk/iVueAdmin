import request from '@/utils/request'
import qs from 'qs'

export function getList(pageNum, pageSize,userId,spreaderID,nickname) {
  return request({
    url: '/accountsInfo?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&userId=' + userId+ '&spreaderID=' + spreaderID+ '&nickname=' + nickname,
    method: 'GET'
  })
}

export function updateRoomCard(params) {
  return request({
    url: '/accountsInfo/updateRoomCard',
    method: 'POST',
    data: qs.stringify(params)
  })
}
export function updateCoin(params) {
  return request({
    url: '/accountsInfo/updateCoin',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function updateSpreader(params) {
  return request({
    url: '/accountsInfo/updateSpreader',
    method: 'POST',
    data: qs.stringify(params)
  })
}

export function getById(id) {
  return request({
    url: '/accountsInfo/'+id,
    method: 'GET'
  })
}
