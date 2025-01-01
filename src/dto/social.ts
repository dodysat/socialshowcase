export interface Social {
  id: string
  username: string
  type: SocialType
}

export enum SocialType {
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
  TIKTOK = "TIKTOK",
}
