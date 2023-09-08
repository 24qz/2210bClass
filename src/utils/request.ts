import axios, { type Method } from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { showLoadingToast, closeToast, showToast } from 'vant'
export const instance = axios.create({
  baseURL: 'http://m.mengxuegu.com/api/',
  timeout: 3000
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    showLoadingToast({
      duration: 0,
      forbidClick: true
    })
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    closeToast()
    if (res.data.code === 20000) {
      showToast(res.data.message)
    }
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}

const request = <T>(url: string, method: Method, submitData?: object | string) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
