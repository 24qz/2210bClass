export type swipt = {
  advertUrl: string
  background: string
  id: number | string
  imageUrl: string
  title: string
}

export type sethomeHotData = {
  current: number
  size: number
  sort?: string
  isFree?: number
}

export type getrecords = {
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

export type gethomeHotData = {
  records: getrecords[]
  total: number
}

export type label = {
  id: number | string
  name: string
}

export type getlabel = {
  id: string
  labelList: label[]
  name: string
}

export type article = {
  categoryId?: number
  current: number
  size: number
}

export type articleItem = {
  id: number
  userId: number
  nickName: string
  title: string
  summary: string
  imageUrl: string
  viewCount: number
  thumhup: number
  updateDate: string
}

export type articleData = {
  records: articleItem[]
  total: number
}

export type articleDetail = {
  createDate: string
  htmlContent: string
  id: string
  imageUrl: string
  ispublic: number | string
  labelIds: number[]
  labelList: label[]
  mdContent: string
  nickName: string
  summary: string
  thumhup: string
  title: string
  updateDate: string
  userId: string
  userImage: null
  viewCount: number | string
}

export type questData = {
  records: questDetail[]
  total: number
}

export type questDetail = {
  createDate: string
  id: string
  reply: string | number
  status: string | number
  nickName: string
  thumhup: string
  title: string
  updateDate: string
  userId: string
  userImage: string
  viewCount: number | string
  labelList: label[]
  htmlContent: string
}

export type qusetComment = {
  id: number | string
  parentId: string
  userId: number
  nickName: string
  userImage: null | string
  mdContent: string
  htmlContent: string
  createDate: string
  questionId: string
}

export type questAnswer = {
  htmlContent: string
  mdContent: string
  questionId: string
}

export type courseSearch = {
  categoryId: string | null
  content: string | null
  current: number
  isFree: string
  labelId?: string | null
  size: number | string
  sort: string | null
}
