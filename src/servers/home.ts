import type {
  article,
  articleData,
  articleDetail,
  courseSearch,
  gethomeHotData,
  getlabel,
  questAnswer,
  questData,
  questDetail,
  qusetComment,
  sethomeHotData,
  swipt
} from '@/types/home'
import type { Comment, searchData } from '@/types/course'
import request from '@/utils/request'
import type { courseList } from '@/types/user'

export const getswipt = () => {
  return request<swipt[]>('/article/api/advert/show/1', 'GET')
}

export const getHomeData = (data: sethomeHotData) => {
  return request<gethomeHotData>('/course/api/course/search', 'POST', data)
}

export const getLabelList = () => {
  return request<getlabel[]>('/article/api/category/label/list', 'GET')
}

export const getArticleData = (data: article) => {
  return request<articleData>('/article/api/article/search', 'POST', data)
}

export const getDetail = (id: string) => {
  return request<articleDetail>(`/article/api/article/${id}`, 'GET')
}

export const getDetailCommot = (id: string) => {
  return request<Comment[]>(`/article/api/comment/list/${id}`, 'GET')
}

export const getHotQuestData = (data: article) => {
  return request<questData>('/question/api/question/hot', 'POST', data)
}
export const getNewQuestData = (data: article) => {
  return request<questData>('/question/api/question/new', 'POST', data)
}
export const getWaitQuestData = (data: article) => {
  return request<questData>('/question/api/question/wait', 'POST', data)
}

export const getQuestDetail = (id: string) => {
  return request<questDetail>(`/question/api/question/${id}`, 'GET')
}

export const getQuestDetailCommot = (id: string) => {
  return request<qusetComment[]>(`/question/api/reply/list/${id}`, 'GET')
}

export const getQuestStatus = (id: string) => {
  return request(`/question/question/star/${id}`, 'PUT')
}

export const getQuestAnswer = (data: questAnswer) => {
  return request('/question/reply', 'POST', data)
}

export const getcourseSearch = (data: courseSearch) => {
  return request<searchData>('course/api/course/search', 'POST', data)
}

export const getarticleSearch = (data: courseSearch) => {
  return request<searchData>('/article/api/article/search', 'POST', data)
}

export const getquestionSearch = (data: courseSearch) => {
  return request<searchData>('/question/api/question/search', 'POST', data)
}
