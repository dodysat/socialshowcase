import { Channel, PlaylistItem, Video } from "@/dto/youtube"
import { Hostname } from "@/helpers/hostname"
import { getChannel } from "@/repository/youtube"

export const fetchChannel = async (
  forHandle: string
): Promise<Channel | null> => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,id,contentDetails&forHandle=${forHandle}&key=${process.env.YOUTUBE_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0]
  } catch (error) {
    console.error("Error fetching channel:", error)
    throw new Error("Failed to fetch channel")
  }
}

export const fetchChannelById = async (id: string): Promise<Channel | null> => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,id,contentDetails&id=${id}&key=${process.env.YOUTUBE_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0]
  } catch (error) {
    console.error("Error fetching channel:", error)
    throw new Error("Failed to fetch channel")
  }
}

export const fetchLastVideos = async (channelId: string): Promise<Video[]> => {
  const hostname = await Hostname()
  const channel = await getChannel(hostname, channelId)
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails&playlistId=${channel?.contentDetails?.relatedPlaylists?.uploads}&maxResults=20`

  const videoIds: string[] = []
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data?.items?.length > 0) {
      data.items.forEach((item: PlaylistItem) => {
        videoIds.push(item.contentDetails.videoId)
      })
    }
  } catch (error) {
    console.error("Error fetching videos:", error)
    throw new Error("Failed to fetch videos")
  }

  const videos: Video[] = []
  const urlVideos = `https://www.googleapis.com/youtube/v3/videos?key=${
    process.env.YOUTUBE_API_KEY
  }&part=contentDetails,id,liveStreamingDetails,localizations,snippet,statistics&id=${videoIds.join(
    ","
  )}`

  try {
    const response = await fetch(urlVideos)
    const data = await response.json()
    data.items.forEach((item: Video) => {
      videos.push(item)
    })
  } catch (error) {
    console.error("Error fetching videos:", error)
    throw new Error("Failed to fetch videos")
  }

  return videos
}
