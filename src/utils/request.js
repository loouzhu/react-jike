// axios的封装处理
import axios from "axios";
import { getToken } from '@/utils'

// 流程：
// 发起请求 → 请求拦截器 → 发送请求 → 接收响应 → 响应拦截器 → 业务代码

// 1.根域名配置
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  // 2.超时时间
  timeout: 5000
})

// 3.请求拦截器/响应拦截器
request.interceptors.request.use((config) => {
  // 操作config，注入token
  // 获取token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码触发
  // 对响应数据的操作
  return response.data
}, (error) => {
  // 超出2xx范围的状态码都会触发该函数
  // 对错误响应的操作
  return Promise.reject(error)
})

export { request }