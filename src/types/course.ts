import type { questDetail } from './home'

export type buyList = {
  id: number | string
  name: string
  sectionList: sectionList[]
}

export type sectionList = {
  id: number | string
  name: string
  isFree: number
  videoUrl: string
}

export type Evaluate = {
  content: string
  courseId: string
  nickName: string
  score: number
  userId: number | string
  userImage: string
}

export type Comment = {
  id: number | string
  parentId: string
  userId: number
  nickName: string
  userImage: null
  isGood: number
  content: string
  createDate: string
  children: CommentChild | null
}

export type CommentChild = {
  id: number
  userId: number
  nickName: string
  userImage: null | string
  content: string
  createDate: string
}

export type searchData = {
  records: packagelist[] & questDetail[]
  total: number
}

export type packagelist = {
  id: number
  userId: number
  nickName: string
  userImage: string
  title: string
  totalTime: string
  studyTotal: number
  commTotal: number
  mainImage: string
  isFree: number
  priceOriginal: number
  priceDiscount: number
}

export type getPackagelist = {
  groupPrice: string
  id: number
  list: packagelist[]
  title: string
  totalPrice: number
}

export type getfeeback = {
  content: string
  qq: string
  type: number | string
  weixin: string
}
