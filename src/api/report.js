import request from '@/utils/request'


export function getSellRecordVO(pageNum, pageSize,directAgencyId) {
  return request({
    url: '/agency/getSellRecordVO?pageNum=' + pageNum + '&pageSize=' + pageSize+ '&directAgencyId=' + directAgencyId,
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
