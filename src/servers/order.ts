import request from '../utils/request'
import type { courseList, myOrder, studyDetails, StudyList } from '@/types/user'

export const getMyOrder = () => {
  return request<myOrder[]>('/pay/order/user/list', 'GET')
}

export const concalMyOrder = (id: string) => {
  return request(`/pay/order/cancel/${id}`, 'PUT')
}

export const delMyOrder = (id: string) => {
  return request(`/pay/order/${id}`, 'DELETE')
}

export const MyBalance = () => {
  return request('/pay/user/balance', 'GET')
}

export const getstudyList = () => {
  return request<StudyList[]>('/course/course/study/list', 'GET')
}

export const getstudyDetails = (id: number | string) => {
  return request<studyDetails>(`/course/api/course/${id}`, 'GET')
}
