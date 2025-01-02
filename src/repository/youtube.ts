import { Channel, Video } from "@/dto/youtube"
import { fetchChannelById, fetchLastVideos } from "@/lib/youtube/youtube"
import redis from "@/redis"

export const getChannel = async (
  hostname: string,
  id: string
): Promise<Channel | null> => {
  const channel: Channel | null = await redis.get(`${hostname}:channel:${id}`)
  if (channel?.exp && channel.exp < new Date().getTime()) {
    setChannel(hostname, channel.id)
  }
  return channel
}

export const setChannel = async (
  hostname: string,
  channelId: string
): Promise<Channel> => {
  const channel = await fetchChannelById(channelId)
  if (!channel) {
    throw new Error("Channel not found")
  }

  const exp = new Date().getTime() + 1000 * 60 * 60 * 24 * 5
  channel.exp = exp
  await redis.set(`${hostname}:channel:${channel.id}`, channel)
  return channel
}

export const deleteChannel = async (
  hostname: string,
  id: string
): Promise<void> => {
  await redis.del(`${hostname}:channel:${id}`)
}

export const getVideos = async (
  hostname: string,
  channelId: string
): Promise<Video[]> => {
  const videos: Video[] =
    (await redis.get(`${hostname}:youtube-videos:${channelId}`)) || []
  console.log("GET VIDEOS", videos)
  if (!videos || videos.length === 0) {
    const fetchedVideos = await fetchLastVideos(channelId)
    console.log("FETCHEDVIDEOS", fetchedVideos)
    const ttl = 60 * 5
    await redis.setex(
      `${hostname}:youtube-videos:${channelId}`,
      ttl,
      fetchedVideos
    )
    return fetchedVideos
  }
  return videos
}
