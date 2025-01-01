import { Social } from "./social"

export interface Instance {
  host: string
  isRegistered: boolean
  name?: string
  profilePicture?: string
  socials?: Social[]
}
