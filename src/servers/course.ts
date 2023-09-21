import request from '../utils/request'
import type { Evaluate, buyList, Comment, getPackagelist, getfeeback } from '@/types/course'

//章节
export const getBuyList = (id: string) => {
  return request<buyList[]>(`/course/course/buy/list/${id}`, 'GET')
}

//评论
export const getEvaluate = (data: Evaluate) => {
  return request('/course/comment', 'POST', data)
}

//提交意见
export const getfeedback = (data: getfeeback) => {
  return request('/system/api/feedback', 'POST', data)
}

//评论列表
export const getComment = () => {
  return request<Comment[]>('/course/api/comment/list/null', 'GET')
}

//套餐列表
export const getPackage = () => {
  return request<getPackagelist[]>('/course/api/group/list/null', 'GET')
}
