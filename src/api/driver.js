import request from '@/utils/request'

export function driverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'get',
    params: data
  })
}

/**
 * 促撮列表查询
 */
export function getSelectList(data) {
  return request({
    url: '/api/bss/v1/bss/corp/makeAMatch/selectListByKey',
    method: 'post',
    data
  })
}
/**
 * 促撮列表详情
 */
export function matchingRecordDetails(params) {
  return request({
    url: '/api/match/corp/match/history/matchingRecordDetails',
    method: 'get',
    params
  })
}
/**
 * 提交按钮
 */
export function submitSave(data) {
  return request({
    url: '/api/match/corp/match/history/save',
    method: 'post',
    data
  })
}
export function judgingIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/corp/driver/judgingIntentionOfReceiving?jia=1',
    method: 'post',
    data
  })
}

