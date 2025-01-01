import { Channel } from "@/dto/youtube"
import redis from "@/redis"

export const getChannel = async (
  hostname: string,
  id: string
): Promise<Channel | null> => {
  const channel: Channel | null = await redis.get(`${hostname}:channel:${id}`)
  return channel
}

export const setChannel = async (
  hostname: string,
  channel: Channel
): Promise<Channel> => {
  const ttl = 60 * 10
  await redis.setex(`${hostname}:channel:${channel.id}`, ttl, channel)
  return channel
}
