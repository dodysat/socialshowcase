import { Social, SocialType } from "@/dto/social"
import { fetchChannelById } from "@/lib/youtube/youtube"
import redis from "@/redis"

export const getSocials = async (hostname: string): Promise<Social[]> => {
  const socials: Social[] = (await redis.get(`${hostname}:socials`)) || []
  const nowMilis = new Date().getTime()
  for (const social of socials) {
    if (social.exp < nowMilis) {
      updateSocial(hostname, social.id)
    }
  }
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

export const getSocialByType = async (
  hostname: string,
  username: string,
  type: SocialType
): Promise<Social | null> => {
  const socials: Social[] = (await redis.get(`${hostname}:socials`)) || []
  if (!socials) {
    return null
  }
  const social = socials.find(
    (social) => social.username === username && social.type === type
  )
  if (!social) {
    return null
  }

  if (social.exp < new Date().getTime()) {
    await updateSocial(hostname, social.id)
  }
  return social
}

export const getSocial = async (
  hostname: string,
  id: string
): Promise<Social | null> => {
  const socials: Social[] = (await redis.get(`${hostname}:socials`)) || []
  if (!socials) {
    return null
  }
  const social = socials.find((social) => social.id === id)
  if (!social) {
    return null
  }

  if (social.exp < new Date().getTime()) {
    await updateSocial(hostname, social.id)
  }
  return social
}

export const updateSocial = async (
  hostname: string,
  id: string
): Promise<Social | null> => {
  const socials: Social[] = (await redis.get(`${hostname}:socials`)) || []
  const social = socials.find((social) => social.id === id)
  if (!social) {
    return null
  }
  const exp = new Date().getTime() + 1000 * 60 * 60 * 24 * 5

  if (social.type === SocialType.YOUTUBE) {
    const channel = await fetchChannelById(social.id)
    if (!channel) {
      return null
    }

    social.username = channel.snippet.title
    social.title = channel.snippet.title
    social.description = channel.snippet.description
    social.thumbnails = channel.snippet.thumbnails.high.url
    social.type = SocialType.YOUTUBE
    social.exp = exp
  }

  await redis.set(`${hostname}:socials`, socials)

  return social
}
