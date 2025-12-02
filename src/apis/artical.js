// 用于编写所有跟发布文章相关的api

import { request } from '@/utils'

// 获取频道列表
export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

// 发布文章
export function publishArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

// 删除文章
export function deleteArticalAPI(articleId) {
  return request({
    url: `/mp/articles/${articleId}`,
    method: 'DELETE',
    id: articleId
  })
}

// 获取文章详情
export function getArticleByIdAPI(articleId) {
  return request({
    url: `/mp/articles/${articleId}`,
    method: 'GET',
  })
}