import { Social, SocialType } from "@/dto/social"
import redis from "@/redis"

export const getSocials = async (hostname: string): Promise<Social[]> => {
  const socials: Social[] = (await redis.get(`${hostname}:socials`)) || []
  return socials
}

export const addSocial = async (
  hostname: string,
  social: Social
): Promise<Social> => {
  const socials = await getSocials(hostname)
  if (!socials) {
    await redis.set(`${hostname}:socials`, [social])
    return social
  }
  socials.push(social)
  await redis.set(`${hostname}:socials`, socials)
  return social
}

export const deleteSocial = async (
  hostname: string,
  id: string
): Promise<void> => {
  const socials = await getSocials(hostname)
  const newSocials = socials.filter((social) => social.id !== id)
  await redis.set(`${hostname}:socials`, newSocials)
}

export const getSocial = async (
  hostname: string,
  username: string,
  type: SocialType
): Promise<Social | null> => {
  const socials = await getSocials(hostname)
  if (!socials) {
    return null
  }
  const social = socials.find(
    (social) => social.id === username && social.type === type
  )
  return social || null
}
