export interface Social {
  id: string
  username: string
  title: string
  description: string
  thumbnails: string
  type: SocialType
  exp: number
}

export interface AddSocialRequest {
  type: SocialType
  username: string
}

export enum SocialType {
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
  TIKTOK = "TIKTOK",
}
