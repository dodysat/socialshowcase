import { Channel } from "@/dto/youtube"

export const fetchChannel = async (
  forHandle: string
): Promise<Channel | null> => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,id&forHandle=${forHandle}&key=${process.env.YOUTUBE_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0]
  } catch (error) {
    console.error("Error fetching channel:", error)
    throw new Error("Failed to fetch channel")
  }
}
