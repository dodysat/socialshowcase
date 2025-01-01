export interface Social {
  id: string
  username: string
  title: string
  description: string
  thumbnails: string
  type: SocialType
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
