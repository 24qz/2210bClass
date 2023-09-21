export type code = {
  mobile: string
  templateCode: string
}

export type user = {
  access_token: string
  expires_in: number
  jti: string
  refresh_token: string
  scope: string
  token_type: string
  userInfo: userInfo
}

export type userInfo = {
  imageUrl: string
  mobile: string
  nickName: string
  sex: number
  uid: string
  username: string
}

//我的订单列表详情
export type courseList = {
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

//我的订单列表
export type myOrder = {
  courseList: courseList[]
  createDate: string
  id: number | string
  orderId: string
  priceDiscount: number | string
  pricePayable: number | string
  status: number
  updateDate: string
  userId: number | string
}

export type StudyList = {
  id: number | string
  mainImage: string
  percent: number
  title: string
}

export type studyDetails = {
  detailUrls?: string[]
  id: number
  userId: number
  nickName: string
  userImage: string
  title: string
  totalTime: string
  studyTotal: number
  goodRate: string
  mainImage: string
  isFree: number
  priceOriginal: number
  priceDiscount: number
}
