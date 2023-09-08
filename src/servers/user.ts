import request from '../utils/request'
import type { code, user, userInfo } from '@/types/user'

export const getcode = (params: { mobile: string; templateCode: string }) => {
  return request<code>('/system/sms/code', 'POST', params)
}

export const getLogin = (params: { code: string; mobile: string }) => {
  return request<user>('/auth/login', 'POST', params)
}

export const getLoginOut = (accessToken: string) => {
  return request('/auth/logout', 'GET', accessToken)
}
