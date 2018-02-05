import request from '@/utils/request'


export function getSellRecordVO(pageNum, pageSize,directAgencyId,directPlayerId) {
  return request({
    url: '/agency/getSellRecordVO?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&directAgencyId=' + directAgencyId+ '&directPlayerId=' + directPlayerId,
    method: 'GET'
  })
}


export function getMoneyFlowVO(year) {
  return request({
    url: '/agency/getMoneyFlowVO?year=' + year,
    method: 'GET'
  })
}


export function getPerformanceVO(year) {
  return request({
    url: '/agency/getPerformanceVO?year=' + year,
    method: 'GET'
  })
}

export function getPerformanceVODetail(pageNum, pageSize,year,month,userId) {
  return request({
    url: '/agency/getPerformanceVODetail?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&year=' + year+ '&month=' + month+ '&userId=' + userId,
    method: 'GET'
  })
}

export function getMoneyFlowVODetail(pageNum, pageSize,year,month,userId) {
  return request({
    url: '/agency/getMoneyFlowVODetail?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&year=' + year+ '&month=' + month+ '&UserId=' + userId,
    method: 'GET'
  })
}
