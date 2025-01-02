import { getSession } from "@/helpers/session"
import { getChannel, getVideos } from "@/repository/youtube"

export async function GET(req: Request): Promise<Response> {
  const session = await getSession()
  if (!session?.email) {
    return new Response(
      JSON.stringify({ error: "Silahkan login terlebih dahulu" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const query = new URL(req.url).searchParams
  const channelId = query.get("channelId")
  if (!channelId) {
    return new Response(JSON.stringify({ error: "Harus memilih channel" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const channel = await getChannel(session.hostname, channelId)
  const videos = await getVideos(session.hostname, channelId)

  return new Response(JSON.stringify({ channel, videos }), {
    headers: { "Content-Type": "application/json" },
  })
}
