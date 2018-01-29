import request from '@/utils/request'
import qs from 'qs'

export function getList(pageNum, pageSize) {
  return request({
    url: '/bulletin?pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'GET'
  })
}

export function update(params) {
  var image = new FormData()
  image.append('id', params.id)
  image.append('title', params.title)
  image.append('content', params.content)
  image.append('desc', params.desc)
  image.append('image',params.image)
  if(params.file){
    image.append('file', params.file)
  }

  return request({
    url: '/bulletin/update',
    method: 'POST',
    data: image
  })
}
