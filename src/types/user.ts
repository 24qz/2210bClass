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
